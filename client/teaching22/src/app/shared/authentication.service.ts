import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {User} from "./user";


interface Token {
  exp: number;
  user: {
    id: string;
    role: string;
  };
}

@Injectable()
export class AuthenticationService {
  private api: string = 'http://teaching22.s1910456004.student.kwmhgb.at/api/auth';
  currentUser: User | undefined;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public isLector() {
    if (Number.parseInt(<string>sessionStorage.getItem("role")) == 1) {
      return true;
    } else {
      return false;
    }
  }

  public setSessionStorage(token: string) {
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("role", decodedToken.user.role);
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
