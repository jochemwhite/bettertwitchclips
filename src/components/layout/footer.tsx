import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer" className="bottom-0 static w-full border-t border-solid border-gray-100 opacity-10 py-31 px-0 pb-282 h-16 flex items-center">
      <div className="flex justify-between w-[1600px] mx-auto text-white">
        <div className="">
          <p>
            Copyright {new Date().getFullYear()} - Designed &amp; Developed by
            <a href="https://streamwizard.org" target="_blank" rel="noreferrer">
              StreamWizard
            </a>
          </p>
        </div>
        <div className="">
          <ul className="flex">
            <li>
              <Link href="/termsandconditions">Terms &amp; Conditions</Link>
            </li>
            <li className="ml-4">
              <Link href="/privacypolicy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
