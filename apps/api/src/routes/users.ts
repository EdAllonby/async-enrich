import { Router, type Router as RouterType } from "express";

export const usersRouter: RouterType = Router();

// Mock user data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    createdAt: "2024-02-20T14:45:00Z",
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Product Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "DevOps Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    createdAt: "2024-04-05T16:20:00Z",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    role: "QA Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva",
    createdAt: "2024-05-12T11:00:00Z",
  },
];

// GET /api/users - Get all users
usersRouter.get("/", (_req, res) => {
  // Simulate network latency for demo purposes
  setTimeout(() => {
    res.json({
      success: true,
      data: users,
      total: users.length,
    });
  }, 500);
});

// GET /api/users/:id - Get user by ID
usersRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id ?? "", 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({
      success: false,
      error: "User not found",
    });
    return;
  }

  res.json({
    success: true,
    data: user,
  });
});
