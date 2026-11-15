import ImageKit from "imagekit";

// Simple English Comment:
// Initialize ImageKit with safe fallbacks so the backend never crashes
// if ImageKit environment variables are not set during local testing.
let imageKit;
try {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "dummy_public_key_for_local_dev",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy_private_key_for_local_dev",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy"
  });
} catch (err) {
  console.warn("[OmniDrive] ImageKit mock initialized. Real image uploads will need live keys.");
  imageKit = {
    upload: async () => ({ url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341" })
  };
}

export default imageKit;
