import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function SkillEditForm({ currentSkill, setSkills, setIsEditing }) {
  const [skillName, setSkillName] = useState(currentSkill.skillName);
  //useState로 description 상태를 생성함.
  const [level, setLevel] = useState(currentSkill.level);
  const [period, setPeriod] = useState(currentSkill.period);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // currentSkill의 userId를 userId 변수에 할당함.
    const userId = currentSkill.userId;

    // "skills/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`skills/${currentSkill.id}`, {
      userId,
      skillName,
      level,
      period,
    });

    // "skilllist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("skilllist", userId);
    // skills를 response의 data로 세팅함.
    setSkills(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="floatingInputCustom">보유기술</label>
      <Form.Group controlId="formBasicSkillName">
        <Form.Control
          type="text"
          placeholder="예: React"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
      </Form.Group>


      <label htmlFor="floatingInputCustom">숙련도</label>
      <Form.Group controlId="formBasicLevel">
        <Form.Control
          type="text"
          placeholder="예: 상,중,하"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </Form.Group>

      <label htmlFor="floatingInputCustom">사용기간</label>
      <Form.Group controlId="formBasicPeriod">
        <Form.Control
          type="text"
          placeholder="예: 5년"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default SkillEditForm;
