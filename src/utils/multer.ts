import multer from 'multer';

const storage = multer.memoryStorage();

/**
 * Returns true if the buffer's magic bytes indicate a native executable
 * (ELF, PE/MZ, or Mach-O), regardless of the declared MIME type.
 */
export function isExecutableBuffer(buf: Buffer): boolean {
    if (buf.length < 4) return false;

    // ELF (Linux/Unix)
    if (buf[0] === 0x7f && buf[1] === 0x45 && buf[2] === 0x4c && buf[3] === 0x46) return true;

    // PE / MZ (Windows)
    if (buf[0] === 0x4d && buf[1] === 0x5a) return true;

    // Mach-O (macOS) — all four byte-order variants
    if (buf[0] === 0xfe && buf[1] === 0xed && buf[2] === 0xfa &&
            (buf[3] === 0xce || buf[3] === 0xcf)) return true;
    if (buf[0] === 0xce && buf[1] === 0xfa && buf[2] === 0xed && buf[3] === 0xfe) return true;
    if (buf[0] === 0xcf && buf[1] === 0xfa && buf[2] === 0xed && buf[3] === 0xfe) return true;

    return false;
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit to match nginx
    }
});