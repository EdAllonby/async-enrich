import { Router, type Router as RouterType } from "express";

export const usersRouter: RouterType = Router();

// Generate 100 mock users for pagination testing
const roles = [
  "Developer",
  "Designer",
  "Product Manager",
  "DevOps Engineer",
  "QA Engineer",
  "Data Scientist",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "Engineering Manager",
];

const firstNames = [
  "Alice", "Bob", "Carol", "David", "Eva", "Frank", "Grace", "Henry", "Ivy", "Jack",
  "Karen", "Leo", "Mia", "Nathan", "Olivia", "Paul", "Quinn", "Rachel", "Sam", "Tina",
  "Uma", "Victor", "Wendy", "Xavier", "Yara", "Zach", "Aria", "Blake", "Chloe", "Dylan",
  "Emma", "Finn", "Gina", "Hugo", "Isla", "James", "Kate", "Liam", "Maya", "Noah",
  "Ava", "Ethan", "Sophia", "Mason", "Luna", "Logan", "Ella", "Lucas", "Zoe", "Oliver",
];

const lastNames = [
  "Johnson", "Smith", "Williams", "Brown", "Martinez", "Anderson", "Taylor", "Thomas",
  "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Clark", "Lewis",
  "Robinson", "Walker", "Hall", "Young", "Allen", "King", "Wright", "Scott", "Green",
  "Baker", "Adams", "Nelson", "Hill", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
  "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez",
  "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy",
];

// Generate mock users
const users = Array.from({ length: 100 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length]!;
  const lastName = lastNames[i % lastNames.length]!;
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const role = roles[i % roles.length]!;
  
  // Generate dates spread across 2024
  const month = (i % 12) + 1;
  const day = (i % 28) + 1;
  const createdAt = `2024-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T10:00:00Z`;

  return {
    id: i + 1,
    name,
    email,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${i}`,
    createdAt,
  };
});

// GET /api/users - Get paginated users
usersRouter.get("/", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string, 10) || 10));
  
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.min(page, totalPages);
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Simulate network latency for demo purposes
  setTimeout(() => {
    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        currentPage,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  }, 300);
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
