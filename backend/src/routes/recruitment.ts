import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Multer storage configuration for CV uploads
const uploadDir = path.join(__dirname, "../../uploads/cvs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "_");
    cb(null, `${Date.now()}_${basename}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file PDF, DOC hoặc DOCX"));
    }
  }
});

// 1. PUBLIC: Upload CV file
router.post("/upload-cv", upload.single("cv"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không tìm thấy file tải lên" });
  }
  const relativeUrl = `/uploads/cvs/${req.file.filename}`;
  return res.json({ cvUrl: relativeUrl });
});

// 2. PUBLIC: List all jobs
router.get("/jobs", async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" }
    });

    if (jobs.length === 0) {
      const defaultJobs = [
        {
          id: "job-digital-programming",
          title: "Nhân Viên Lập Trình Số",
          salary: "14.000.000 - 15.000.000 VND",
          location: "TBS Zone 2, 2/434 Bình Đáng, Bình Hòa, TP. Hồ Chí Minh",
          description: "Gia nhập TBS Group để kiến tạo tương lai số. Tham gia xây dựng hệ thống quy trình sản xuất thông minh TBS II.",
          requirements: "Năng lực cơ bản HTML & CSS (xây dựng khung & giao diện), JavaScript (hiệu ứng & tương tác), C# và thiết kế đồ họa cơ bản.",
          contactEmail: "tuyendungdaotaovp2@tbsgroup.vn",
          contactPhone: "0905 359 017 Miss Lịch",
          createdAt: new Date()
        },
        {
          id: "job-hr-officer",
          title: "Chuyên Viên Tuyển Dụng & Đào Tạo",
          salary: "12.000.000 - 16.000.000 VND",
          location: "Văn phòng Trụ sở TBS Group, Bình Dương",
          description: "Phụ trách đăng tin tuyển dụng, sàng lọc hồ sơ ứng viên, điều phối phỏng vấn các vị trí phân xưởng và văn phòng.",
          requirements: "Tốt nghiệp Đại học chuyên ngành QLNN, Nhân sự hoặc liên quan. Có kinh nghiệm tuyển dụng sản xuất.",
          contactEmail: "tuyendungdaotaovp2@tbsgroup.vn",
          contactPhone: "0905 359 017 Miss Lịch",
          createdAt: new Date()
        }
      ];
      return res.json(defaultJobs);
    }

    return res.json(jobs);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch jobs" });
  }
});

// 3. PUBLIC: Apply to job
router.post("/jobs/:id/apply", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, email, phone, coverLetter, cvUrl } = req.body;

  if (!fullName || !email || !phone || !cvUrl) {
    return res.status(400).json({ error: "Thiếu thông tin ứng tuyển bắt buộc" });
  }

  try {
    let jobExists = await prisma.job.findUnique({ where: { id } });
    if (!jobExists) {
      jobExists = await prisma.job.create({
        data: {
          id,
          title: id === "job-digital-programming" ? "Nhân Viên Lập Trình Số" : "Chuyên Viên Tuyển Dụng & Đào Tạo",
          salary: id === "job-digital-programming" ? "14 - 15 triệu" : "12 - 16 triệu",
          location: "TBS Zone 2",
          description: "Tuyển dụng vị trí lập trình số/HR",
          requirements: "Yêu cầu kĩ năng chuyên môn phù hợp",
          contactEmail: "tuyendungdaotaovp2@tbsgroup.vn",
          contactPhone: "0905 359 017 Miss Lịch"
        }
      });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: jobExists.id,
        fullName,
        email,
        phone,
        coverLetter,
        cvUrl
      }
    });

    return res.json({ success: true, application });
  } catch (error) {
    console.error("Apply error:", error);
    return res.status(500).json({ error: "Lỗi hệ thống khi nộp đơn ứng tuyển" });
  }
});

// Auth middleware helper for HR / Admin role check
const requireHR = (req: AuthenticatedRequest, res: Response, next: any) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const isHR = req.user.role === "ADMIN" || req.user.role === "GIAM_DOC" || req.user.role === "TRUONG_PHONG" || req.user.departmentId === "HRD";
  if (isHR) {
    next();
  } else {
    return res.status(403).json({ error: "Không có quyền truy cập. Chỉ dành cho Nhân sự (HR)" });
  }
};

// 4. HR STAFF: View applications
router.get("/hr/applications", authenticateToken as any, requireHR as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const apps = await prisma.jobApplication.findMany({
      include: { job: true },
      orderBy: { createdAt: "desc" }
    });
    return res.json(apps);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch applications" });
  }
});

// 5. HR STAFF: Post new job
router.post("/hr/jobs", authenticateToken as any, requireHR as any, async (req: AuthenticatedRequest, res: Response) => {
  const { title, salary, location, description, requirements, contactEmail, contactPhone } = req.body;
  if (!title || !salary || !location || !description || !requirements) {
    return res.status(400).json({ error: "Thiếu thông tin đăng tuyển" });
  }

  try {
    const job = await prisma.job.create({
      data: {
        title,
        salary,
        location,
        description,
        requirements,
        contactEmail: contactEmail || "tuyendungdaotaovp2@tbsgroup.vn",
        contactPhone: contactPhone || "0905 359 017 Miss Lịch"
      }
    });
    return res.json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ error: "Could not create job listing" });
  }
});

// 6. HR STAFF: Delete job vacancy
router.delete("/hr/jobs/:id", authenticateToken as any, requireHR as any, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.job.delete({ where: { id } });
    return res.json({ success: true, message: "Đã xóa tin tuyển dụng thành công" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete job vacancy" });
  }
});

export default router;
