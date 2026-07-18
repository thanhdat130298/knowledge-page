import { Node, mergeAttributes } from "@tiptap/core";

function createBlock(name: string, defaultLabel: string) {
  return Node.create({
    name,
    group: "block",
    content: "block+",
    defining: true,
    addAttributes() {
      return {
        label: {
          default: defaultLabel,
        },
      };
    },
    parseHTML() {
      return [{ tag: `div[data-type="${name}"]` }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          "data-type": name,
          class: "custom-block",
        }),
        0,
      ];
    },
  });
}

export const InterviewQuestion = createBlock(
  "interviewQuestion",
  "Câu hỏi phỏng vấn",
);
export const ShortAnswer = createBlock("shortAnswer", "Câu trả lời ngắn");
export const DetailedExplanation = createBlock(
  "detailedExplanation",
  "Giải thích chi tiết",
);
export const Note = createBlock("note", "Lưu ý");
export const Warning = createBlock("warning", "Cảnh báo");
export const CommonMistake = createBlock("commonMistake", "Sai lầm thường gặp");
export const FollowUpQuestion = createBlock(
  "followUpQuestion",
  "Câu hỏi mở rộng",
);
export const JuniorAnswer = createBlock("juniorAnswer", "Junior Answer");
export const MiddleAnswer = createBlock("middleAnswer", "Middle Answer");
export const SeniorAnswer = createBlock("seniorAnswer", "Senior Answer");
export const RealExperience = createBlock(
  "realExperience",
  "Kinh nghiệm thực tế",
);
export const Reference = createBlock("reference", "Nguồn tham khảo");

export const customBlockExtensions = [
  InterviewQuestion,
  ShortAnswer,
  DetailedExplanation,
  Note,
  Warning,
  CommonMistake,
  FollowUpQuestion,
  JuniorAnswer,
  MiddleAnswer,
  SeniorAnswer,
  RealExperience,
  Reference,
];
