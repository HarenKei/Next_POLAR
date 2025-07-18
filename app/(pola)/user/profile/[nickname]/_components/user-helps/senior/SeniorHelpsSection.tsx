"use client";
import Link from "next/link";
import styles from "./seniorHelps.module.css";
import HelpListCard from "@/app/_components/commons/list-card/help-list-card/HelpListCard";
import type { HelpListResponseDto } from "@/backend/helps/applications/dtos/HelpDTO";

interface SeniorHelpsSectionProps {
  title?: string;
  nickname: string;
}

const getCategoryName = (categoryId: number) => {
  const categories: { [key: number]: string } = {
    1: "🧹 청소",
    2: "🍳 요리",
    3: "🚗 운전",
    4: "💬 상담",
    5: "✨ 기타",
  };
  return categories[categoryId] || "기타";
};

const SeniorHelpsSection: React.FC<SeniorHelpsSectionProps> = ({
  title,
  nickname,
}) => {
  // 더미 데이터
  const URL = `/user/profile/${nickname}/helps`;
  const dummyHelps: HelpListResponseDto[] = [
    {
      id: 1,
      seniorInfo: {
        nickname: "cleanMaster",
        name: "청소왕",
        profileImgUrl:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80",
      },
      title: "여름맞이 대청소 도우미 모집",
      startDate: new Date("2024-08-10"),
      endDate: new Date("2024-08-10"),
      category: [{ id: 1, point: 0 }],
      content: "여름철 대청소를 함께해요!",
      status: "완료",
      createdAt: new Date("2024-07-20"),
    },
    {
      id: 2,
      seniorInfo: {
        nickname: "cookQueen",
        name: "요리여왕",
        profileImgUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
      },
      title: "쿠킹 클래스 & 점심 제공",
      startDate: new Date("2024-09-05"),
      endDate: new Date("2024-09-05"),
      category: [{ id: 2, point: 0 }],
      content: "함께 요리하고 식사해요!",
      status: "모집중",
      createdAt: new Date("2024-08-15"),
    },
    {
      id: 3,
      seniorInfo: {
        nickname: "driveHero",
        name: "운전영웅",
        profileImgUrl:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
      },
      title: "병원 동행 운전 봉사",
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-01"),
      category: [{ id: 3, point: 0 }],
      content: "병원까지 안전하게 모셔다드려요.",
      status: "진행중",
      createdAt: new Date("2024-09-20"),
    },
  ];

  return (
    <section className={styles.seniorHelpsSection}>
      <div className={styles.seniorHelpsTitleContainer}>
        <h2>{title}</h2>
        <div className={styles.seniorHelpsSectionTitleButton}>
          <Link href={URL}>더보기</Link>
        </div>
      </div>

      <div className={styles.seniorHelpList}>
        {dummyHelps.map((help) => (
          <div key={help.id}>
            <HelpListCard help={help} />
            {/* 카테고리 이름 표시 */}
            <div style={{ marginTop: 4, fontSize: "0.95rem", color: "#888" }}>
              {Array.isArray(help.category)
                ? help.category.map((cat) => getCategoryName(cat.id)).join(", ")
                : ""}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeniorHelpsSection;
