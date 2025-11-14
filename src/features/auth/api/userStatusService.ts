import type { User, UserOnboardingStatus } from "../types/auth.types";

class UserStatusService {
  checkUserStatus(user: User | null): UserOnboardingStatus {
    if (!user) {
      return {
        hasLeagues: false,
        isFirstTime: true,
        shouldShowWelcome: true,
      };
    }

    const hasLeagues = !!(user.ligas && user.ligas.length > 0);
    const isFirstTime = user.isFirstTime ?? !hasLeagues;

    return {
      hasLeagues,
      isFirstTime,
      shouldShowWelcome: isFirstTime && !hasLeagues,
    };
  }

  getRedirectPath(user: User | null): string {
    const status = this.checkUserStatus(user);

    if (status.shouldShowWelcome) {
      return "/welcome";
    }

    if (status.hasLeagues) {
      return "/dashboard";
    }

    return "/dashboard";
  }

  markOnboardingComplete(user: User): User {
    const updatedUser = { ...user, isFirstTime: false };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  }
}

export default new UserStatusService();
