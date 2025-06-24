import os from "os";
import path from "path";

export function getBinaryPath() {
  const platform = os.platform();
  const binariesDir = path.join(process.cwd(), "binaries");

  console.log(`binariesDir: ${binariesDir}`);

  switch (platform) {
    case "darwin": // macOS
      return path.join(binariesDir, "mac", "your-c-program");
    case "linux":
      return path.join(binariesDir, "linux", "your-c-program");
    case "win32": // Windows
      return path.join(binariesDir, "windows", "your-c-program.exe");
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}
