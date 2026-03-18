/**
 * TypeScript declaration for importing PDF assets with Vite.
 * Example usage:
 *   import resumePdf from "../assets/timothyresume.pdf";
 *   <iframe src={resumePdf} />
 */
declare module "*.pdf" {
  const src: string;
  export default src;
}