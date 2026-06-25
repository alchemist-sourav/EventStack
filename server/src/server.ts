import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store
let registrations: any[] = [];

// Event Details
const eventDetails = {
  id: "evt_1",
  name: "AI & Vibe Coding Workshop",
  date: "15 July 2026",
  time: "10:00 AM",
  venue: "College Seminar Hall",
  speaker: {
    name: "John Doe",
    title: "Senior Software Engineer"
  },
  seatsTotal: 100,
  description: "Join us for an interactive coding workshop where we'll explore AI-driven development and modern web technologies. Perfect for students looking to level up their coding skills.",
  agenda: [
    { time: "10:00 AM", title: "Introduction & Keynote" },
    { time: "11:00 AM", title: "AI in Modern Development" },
    { time: "01:00 PM", title: "Hands-on Live Coding" },
    { time: "03:00 PM", title: "Q&A and Networking" }
  ],
  benefits: [
    "Learn the latest AI coding tools",
    "Build a real-world project",
    "Network with industry experts",
    "Certificate of participation"
  ],
  faqs: [
    { question: "Do I need prior coding experience?", answer: "Basic knowledge of HTML, CSS, and JS is recommended but not mandatory." },
    { question: "What should I bring?", answer: "Please bring your laptop and charger." },
    { question: "Is there a registration fee?", answer: "No, this workshop is completely free for college students." }
  ]
};

// Middleware for Admin Auth
const requireAdmin = (req: Request, res: Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer admin_secret_token') {
    next();
  } else {
    res.status(403).json({ error: '403 Forbidden: Admin access required' });
  }
};
// POST /api/login
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.json({
      token: 'admin_secret_token',
      user: { name: 'Admin User', email: 'admin@vibetech.edu', role: 'admin' }
    });
  }

  if (username === 'student' && password === 'student123') {
    return res.json({
      token: 'student_secret_token',
      user: { name: 'Student Demo', email: 'student@college.edu', role: 'student' }
    });
  }

  return res.status(401).json({ error: 'Invalid username or password' });
});
// GET /api/event
app.get('/api/event', (req: Request, res: Response) => {
  const seatsAvailable = eventDetails.seatsTotal - registrations.length;
  res.json({ ...eventDetails, seatsAvailable });
});

// GET /api/registrations
app.get('/api/registrations', requireAdmin, (req: Request, res: Response) => {
  res.json(registrations);
});

// POST /api/register
app.post('/api/register', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, department, year, college } = req.body;

    if (!fullName || !email || !phone || !department || !year || !college) {
       return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic email validation
    if (!email.includes('@')) {
       return res.status(400).json({ error: 'Invalid email format' });
    }

    const newRegistration = {
      id: `REG_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      fullName,
      email,
      phone,
      department,
      year,
      college,
      registeredAt: new Date().toISOString()
    };

    registrations.push(newRegistration);
    res.status(201).json({ success: true, registration: newRegistration });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/registrations/:id
app.delete('/api/registrations/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = registrations.length;
  registrations = registrations.filter(reg => reg.id !== id);

  if (registrations.length === initialLength) {
    return res.status(404).json({ error: 'Registration not found' });
  }
  
  res.json({ success: true, message: 'Registration deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
