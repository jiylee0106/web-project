import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import convertTime from "../ConvertTime";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [schoolName, setSchoolName] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [today, setToday] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //에러처리
    if (!schoolName) {
      alert("학교 이름을 입력해 주세요.");
      return;
    }

    if (!status) {
      alert("재학 상태를 선택해 주세요.");
      return;
    }

    if (!startDate) {
      alert("입학 날짜를 선택해 주세요.");
      return;
    }

    if (!endDate) {
      alert(
        "졸업 날짜를 선택해 주세요. 재학 중이라면 오늘 날짜를 입력해 주세요."
      );
      return;
    }

    const isValidDate = startDate < endDate;
    const isValidToday = startDate < today;

    if (!isValidDate) {
      alert("시작 날짜가 종료 날짜와 같거나 종료 날짜보다 늦을 수 없습니다.");
      return;
    }
    if (!isValidToday) {
      alert("오늘 날짜를 기준으로 미래 날짜는 선택이 불가능합니다. ");
      return;
    }

    const userId = portfolioOwnerId;

    await Api.post("education/create", {
      userId: portfolioOwnerId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    });

    const data = {
      userId,
      schoolName,
      schoolType,
      major,
      status,
      startDate,
      endDate,
    };

    setStartDate(convertTime(startDate));
    data.startDate = convertTime(startDate);

    setEndDate(convertTime(endDate));
    data.endDate = convertTime(endDate);

    setToday(convertTime(new Date()));

    const res = await Api.get("educationlist", userId);
    setEducations(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="component-card">
      <label htmlFor="floatingInputCustom">학교</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={schoolName}
        placeholder="예 :00고등학교/00대학교"
        onChange={(e) => setSchoolName(e.target.value)}
      />

      <label htmlFor="floatingInputCustom">학위</label>
      <Form.Select
        aria-label="Default select example"
        value={schoolType}
        onChange={(e) => setSchoolType(e.target.value)}
      >
        <option value="">학위를 선택해주세요</option>
        <option value="학사">학사</option>
        <option value="석사">석사</option>
        <option value="박사">박사</option>
      </Form.Select>

      <label htmlFor="floatingInputCustom">전공</label>
      <Form.Control
        id="floatingInputCustom"
        type="text"
        value={major}
        placeholder="예:경영학"
        onChange={(e) => setMajor(e.target.value)}
      />

      <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">재학여부를 선택해주세요</option>
        <option value="재학중">재학중</option>
        <option value="휴학">휴학</option>
        <option value="수료">수료</option>
        <option value="졸업">졸업</option>
      </Form.Select>

      <>
        <label htmlFor="floatingInputCustom">입학 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          showMonthDropdown
          showYearDropdown
          selected={startDate}
          onChange={(startDate) => setStartDate(startDate)}
        />
        <label htmlFor="floatingInputCustom">졸업 날짜</label>
        <DatePicker
          showIcon
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택해 주세요"
          showMonthDropdown
          showYearDropdown
          selected={endDate}
          onChange={(endDate) => setEndDate(endDate)}
        />
      </>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <button type="submit" className="btn-confirm">
            확인
          </button>
          <button className="btn-cancel" onClick={() => setIsAdding(false)}>
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
