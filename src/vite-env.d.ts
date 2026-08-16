/// <reference types="vite/client" />

// vite/client only declares lowercase image extensions; a few source assets
// (e.g. student_learning.JPEG, assembly.JPEG) came in with uppercase ones.
declare module "*.JPEG" {
  const src: string;
  export default src;
}
declare module "*.JPG" {
  const src: string;
  export default src;
}
