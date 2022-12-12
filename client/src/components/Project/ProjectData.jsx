import {
  FaCss3Alt,
  FaBootstrap,
  FaLaravel,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { ImHtmlFive } from "react-icons/im";
import { RiFlutterFill } from "react-icons/ri";
import { DiJavascript1, DiJqueryLogo, DiMongodb } from "react-icons/di";
import { SiFirebase, SiMysql, SiPhp } from "react-icons/si";
import culib from "../../assets/project/culibrary.png";
import five from "../../assets/project/five.png";
import four from "../../assets/project/four.png";
import three from "../../assets/project/three.png";
import two from "../../assets/project/two.png";
import one from "../../assets/project/one.png";
import blog from "../../assets/project/react&blog.jpeg";

const language = [
  <ImHtmlFive />,
  <FaCss3Alt />,
  <FaBootstrap />,
  <DiJavascript1 />,
  <DiJqueryLogo />,
];

const ProjectData = [
  {
    id: 1,
    type: "mobile",
    items: {
      img: culib,
      title: "CULIBRARY",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [<RiFlutterFill />, <SiFirebase />],
      link: "https://github.com/DevIdol/culibrary_mobileApp_sourceCode",
      download:
        "https://drive.google.com/u/2/uc?id=1QXjsNX_qQ8BMkdE4UkCQI_hbcEMZA6eJ&export=download",
    },
  },
  {
    id: 2,
    type: "web",
    items: {
      img: four,
      title: "CMS",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [...language, <SiPhp />, <SiMysql />],
      link: "https://github.com/DevIdol/php_tutorials/tree/main/cms",
      download:
        "https://github.com/DevIdol/php_tutorials/archive/refs/heads/main.zip",
    },
  },
  {
    id: 3,
    type: "web",
    items: {
      img: two,
      title: "Portfolio WebSite",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [<FaLaravel />, <SiMysql />],
      link: "https://github.com/DevIdol/sample_portfolio_website_with_laravel",
      download:
        "https://github.com/DevIdol/sample_portfolio_website_with_laravel/archive/refs/heads/main.zip",
    },
  },
  {
    id: 4,
    type: "web",
    items: {
      img: one,
      title: "Ecommerce WebDesign",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [...language],
      link: "https://github.com/DevIdol/onlineshop-webDesign",
      download:
        "https://github.com/DevIdol/onlineshop-webDesign/archive/refs/heads/main.zip",
    },
  },
  {
    id: 5,
    type: "web",
    items: {
      img: three,
      title: "Resume & Blog",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [...language],
      link: "https://github.com/DevIdol/portfo",
      download: "https://github.com/DevIdol/portfo/archive/refs/heads/main.zip",
    },
  },

  {
    id: 6,
    type: "web",
    items: {
      img: five,
      title: "Mini Ecomeerce",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [<FaLaravel />, <SiMysql />],
      link: "https://github.com/DevIdol/sample_laravel_ecommerce",
      download:
        "https://github.com/DevIdol/sample_laravel_ecommerce/archive/refs/heads/main.zip",
    },
  },
  {
    id: 7,
    type: "web",
    items: {
      img: blog,
      title: "MERN Stack Blog",
      describtion:
        "Quae esse totam blanditiis modi aspernatur! Libero aspernatur autem voluptatibus modi doloremque perspiciatis rem id, deleniti accusantium minus nam ea quae vero!",
      language: [<FaReact />, <FaNodeJs />, <DiMongodb />, "ex"],
      link: "https://github.com/DevIdol/MERN_PROJECT",
      download:
        "https://github.com/DevIdol/MERN_PROJECT/archive/refs/heads/main.zip",
    },
  },
];

export const getProjectData = () => ProjectData;
