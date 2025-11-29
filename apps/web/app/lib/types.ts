export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: Pagination;
}

export interface LeadershipResponse {
  success: boolean;
  data: User[];
}

export interface RandomUsersResponse {
  success: boolean;
  data: User[];
}

export interface RoleUsersResponse extends UsersResponse {
  role: string;
}

export interface ExtraDetails {
  userId: number;
  age: number;
  department: string;
  location: string;
  yearsAtCompany: number;
}

