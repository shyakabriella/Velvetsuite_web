import { useEffect } from "react";

export default function CookieCleaner() {
  useEffect(() => {
    const clearCookies = () => {
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();

        if (!name) return;

        const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; `;

        document.cookie = `${expired}path=/`;
        document.cookie = `${expired}path=/; domain=${window.location.hostname}`;
        document.cookie = `${expired}path=/; domain=.velvetsuites.rw`;
      });
    };

    clearCookies();
  }, []);

  return null;
}
