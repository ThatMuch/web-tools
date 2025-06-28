import "./style.scss";

import Button from "../../UI/Button/Button";
import ButtonTab from "./ButtonTab/ButtonTab";
import { MdLogout } from "react-icons/md";
import ResponseCount from "./ResponseCount/ResponseCount";
import { getCurrentMonth } from "../utils/dateUtils";
import { useAuthStore } from "../../../stores/authStore";

type HeroSectionProps = {
  isGlobalStat: boolean;
  onToggle: (isGlobalStat: boolean) => void;
  responseCount: number;
  responseThisMonth: number;
  average: number;
};
const HeroSection = ({
  isGlobalStat,
  onToggle,
  responseCount,
  responseThisMonth,
  average,
}: HeroSectionProps) => {
  const { logout } = useAuthStore();
  return (
    <div className="stat-hero-section">
      <div className="stat-hero-section-header">
        <h1 className="mb-0">Statistiques des réponses</h1>
        <Button
          type="button"
          className="btn-primary"
          onClick={() => logout()}
          aria-label="Se déconnecter"
        >
          <MdLogout color="currentColor" />
        </Button>
      </div>
      <div className="container">
        <div className="section-numbers">
          <ResponseCount label="Total des réponses" count={responseCount} />
          <ResponseCount
            label={"Réponses en " + getCurrentMonth()}
            count={responseThisMonth}
          />
          <ResponseCount label="Moyenne des réponses" count={average} />
          {/* <Pastille value={Number(average)} big /> */}
        </div>
        <div className="section-button">
          <ButtonTab
            label="Réponses"
            isActive={!isGlobalStat}
            onClick={() => onToggle(false)}
          ></ButtonTab>
          <ButtonTab
            label="Stats"
            isActive={isGlobalStat}
            onClick={() => onToggle(true)}
          ></ButtonTab>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
