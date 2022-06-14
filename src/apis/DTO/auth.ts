export interface SignUpDTO {
  email: string;
  password: string;
  username: string;
}

export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignInResponseDTO {
  token: string;
}
