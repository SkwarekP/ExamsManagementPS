import { useEffect, useState } from 'react';
import { ExamType } from '../types';

export const useNote = (
  examType: ExamType,
  percentageResult: number,
  name: string
) => {
  const [note, setNote] = useState<string>();

  useEffect(() => {
    if (percentageResult >= 0 && percentageResult <= 25) {
      setNote(
        `Hey ${name[0].toUpperCase() + name.slice(1)}, I noticed your ${examType} exam score. Don't be discouraged by the result. Let's work together to improve your understanding of ${examType} concepts. We've got this!`
      );
    } else if (percentageResult > 25 && percentageResult <= 50) {
      setNote(
        `Hi ${name[0].toUpperCase() + name.slice(1)}, your ${examType} exam score is a good starting point, but there's room for improvement. Let's review the material and practice more to boost your confidence and skills.`
      );
    } else if (percentageResult > 50 && percentageResult < 77) {
      setNote(
        `Great job on your ${examType} exam, ${name[0].toUpperCase() + name.slice(1)}! You're making solid progress. Let's continue to refine your skills and reach even higher scores in the future.`
      );
    } else
      setNote(
        `Congratulations, ${name[0].toUpperCase() + name.slice(1)}! You aced the ${examType} exam! Your dedication and hard work paid off. Keep up the excellent work!`
      );
  }, [name, percentageResult, examType]);

  return note;
};
