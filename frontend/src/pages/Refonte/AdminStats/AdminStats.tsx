import {
  computeCategoryStats,
  computeGlobalScoreStats,
} from "../../../components/AdminStats/utils/quizStatsUtils";

import CategorySelector from "../../../components/AdminStats/CategorySelector/CategorySelector";
import HeroSection from "../../../components/AdminStats/HeroSection/HeroSection";
import QuestionStats from "../../../components/AdminStats/QuestionStats/QuestionStats";
import SubmissionAnswers from "../../../components/AdminStats/SubmissionAnswers/SubmissionAnswers";
import SubmissionListTable from "../../../components/AdminStats/SubmissionListTable/SubmissionListTable";
import type { SubmissionTableType } from "../../../types/types";
import questionsData from "../../../data/questionquiz.json";
import { useAuthStore } from "../../../stores/authStore";
import { useFetchFirebase } from "../../../hooks/use-firebase";
import { useState } from "react";

/**
 * Composant principal d'administration des statistiques du quiz.
 */
const AdminStats = () => {
  const { user } = useAuthStore();
  console.log(user);
  const currentMonth = new Date().getMonth();
  //const currentMonth = 4;
  const [isGlobalStat, setGlobalStat] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(
    questionsData[0]?.slug || null
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionTableType | null>(null);

  // données de la bdd
  const { data } = useFetchFirebase("submissions");
  const submissions = data || [];

  const categoryStats = computeCategoryStats(submissions, questionsData);
  const { totalSubmissions, averageGlobalScore, numberThisMonth } =
    computeGlobalScoreStats(submissions, currentMonth);

  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
  };

  const selectedCategory = questionsData.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <div className="AdminStats">
      <HeroSection
        isGlobalStat={isGlobalStat}
        onToggle={setGlobalStat}
        responseCount={totalSubmissions}
        responseThisMonth={numberThisMonth}
        average={averageGlobalScore.toFixed(0)}
      />
      <div className="container">
        {/* Vue globale */}
        {isGlobalStat && (
          <div className=" d-flex gap-2 w-100 flex-row align-items-start">
            <CategorySelector
              categories={categoryStats}
              selectedSlug={selectedCategorySlug}
              onSelect={handleCategoryClick}
            />

            {selectedCategory && (
              <QuestionStats
                category={selectedCategory}
                submissions={submissions}
                onClick={(id) => {
                  const selected: any = submissions.find((s) => s.id === id);
                  setSelectedSubmission(selected);
                  setGlobalStat(false);
                }}
              />
            )}
          </div>
        )}

        {/* Vue des soumissions individuelles */}
        {!isGlobalStat && (
          <SubmissionListTable
            submissions={submissions as SubmissionTableType[]}
            onClick={(id) => {
              const selected: any = submissions.find((s) => s.id === id);
              setSelectedSubmission(selected);
            }}
          />
        )}
        {!isGlobalStat && selectedSubmission && (
          <div>
            <div className=" d-flex gap-2 w-100 flex-row align-items-start">
              <CategorySelector
                categories={computeCategoryStats(
                  selectedSubmission ? [selectedSubmission] : [],
                  questionsData
                )}
                selectedSlug={selectedCategorySlug}
                onSelect={handleCategoryClick}
                title={`${selectedSubmission.firstName} ${selectedSubmission.lastName}`}
                globalScore={selectedSubmission.scores.globalScore}
              />
              <SubmissionAnswers
                selectedSubmission={selectedSubmission}
                selectedCategorySlug={selectedCategorySlug}
                questionsData={questionsData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
