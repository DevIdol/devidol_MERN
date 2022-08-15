import { FaGitAlt, FaLinux } from "react-icons/fa";

import {
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiFirebase,
  SiAiohttp,
} from "react-icons/si";
import { FaGlobeEurope } from "react-icons/fa";

const OtherSkillData = [
  {
    id: 1,
    title: "OS, Cloud & Version Control System",
    skill: [
      {
        id: 1,
        icon: <SiFirebase />,
        type: "Firebase",
      },
      {
        id: 2,
        icon: <FaGitAlt />,
        type: "Git | GitHub",
      },
      {
        id: 3,
        icon: <FaLinux />,
        type: "Windows | Linux (Ubuntu)",
      },
    ],
  },
  {
    id: 2,
    title: "Design",
    skill: [
      {
        id: 1,
        icon: <SiAdobephotoshop />,
        type: "Adobe Photoshop",
      },
      {
        id: 2,
        icon: <SiAdobepremierepro />,
        type: "Adobe Premiere Pro",
      },
    ],
  },
  {
    id: 3,
    title: "Language",
    skill: [
      {
        id: 1,
        icon: "🇲🇲",
        type: "Myanmar",
      },
      {
        id: 2,
        icon: "🇬🇧",
        type: "English (Intermediate)",
      },
    ],
  },
  {
    id: 4,
    title: "Certificate",
    skill: [
      {
        id: 1,
        icon: <SiAiohttp />,
        type: "Web Design Complete Course",
      },
      {
        id: 2,
        icon: <FaGlobeEurope />,
        type: "English (Intermediate)",
      },
    ],
  },
];

export const getOtherSkillData = () => OtherSkillData;
