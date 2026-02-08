// middleware.ts (di Root)
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Daftar bahasa yang didukung
  locales: ["en", "id"],

  // Bahasa default jika tidak terdeteksi
  defaultLocale: "en",
});

export const config = {
  // Matcher agar middleware hanya berjalan di halaman yang perlu
  matcher: ["/", "/(id|en)/:path*"],
};
