import { Card, Modal, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../../api";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
}) {
  const handleDelete = async () => {
    await Api.delete("certificates", certificate.id).then(() => {
      setCertificates((prevCertificates) =>
        prevCertificates.filter(
          (prevCertificate) => prevCertificate.id !== certificate.id
        )
      );
    });
  };

  useEffect(() => {}, [certificate]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate?.title}</span>
          <br />
          <span className="text-muted">{certificate?.authority}</span>
          <br />
          <span className="text-muted">{certificate?.registerNum}</span>
          <br />
          <span className="text-muted">{certificate?.grade}</span>
        </Col>

        {isEditable && (
          <Col xs lg="3" style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="btn-edit"
            >
              편집
            </button>
            <>
              <button onClick={handleShow} className="btn-delete">
                삭제
              </button>

              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closebutton>
                  <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말로 삭제하시겠습니까? T.T</Modal.Body>
                <Modal.Footer>
                  <button onClick={handleClose} className="btn-cancel">
                    취소
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      handleDelete();
                    }}
                    className="btn-confirm"
                  >
                    확인
                  </button>
                </Modal.Footer>
              </Modal>
            </>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
