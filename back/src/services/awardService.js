import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class AwardService {
  static async addAward({ userId, title, grade, date, description }) {
    const id = uuidv4();

    const newAward = { id, userId, title, grade, date, description };

    if (
      !newAward.title ||
      !newAward.date ||
      !newAward.description
    ) {
      const errorMessage =
        "Award 추가: 값이 공란입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    const award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage =
        "Award 조회: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return award;
  }

  static async getAwardList({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async setAward({ awardId, toUpdate }) {
    let award = await Award.findById({ awardId });

    if (!award) {
      const errorMessage =
        "Award 조회: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.grade) {
      const fieldToUpdate = "grade";
      const newValue = toUpdate.grade;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }
    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    return award;
  }

  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    if (!isDataDeleted) {
      const errorMessage =
        "Award 삭제: 해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { AwardService };
