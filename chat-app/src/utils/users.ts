import { Payload } from "@/types";
import { jwtDecode } from "jwt-decode";

const access = localStorage?.getItem("access") || null;

export const user = access && jwtDecode(access) as Payload || { name: "", userId: "" };
