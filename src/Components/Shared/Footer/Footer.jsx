import { Typography } from "@material-tailwind/react";
 import logo from "../../../assets/logo.svg"
const LINKS = [
  {
    title: "Find Teacher",
    items: ["English Teachers", "Chinese Teachers", "French Teachers", "Spanish Teachers"],
  },
  {
    title: "Lessons",
    items: ["Web Development", "Android Development", "Graphic Design", "View Wditing"],
  },
  {
    title: "Company",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];


const Footer = () => {
    return (
        <footer className="relative mt-20 bg-gradient-to-r from-[#f5ede2] py-[5rem] w-full">
        <div className="mx-auto w-full px-[8%]">
          <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <Typography variant="h5" className="mb-6">
              <img className="w-[10rem]" src={logo} alt="" />
              <h1 className="text-3xl font-serif mt-4">LetsSkillUp</h1>
            </Typography>
            <div className="grid grid-cols-3 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-medium opacity-40"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href="#"
                        color="gray"
                        className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          
        </div>
      </footer>
    );
};

export default Footer;