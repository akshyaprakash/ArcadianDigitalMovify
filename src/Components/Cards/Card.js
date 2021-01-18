import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card, Button } from 'antd';
import { imageBasePath } from "../../utils/request"
const { Meta } = Card;
class Cards extends PureComponent {

    render() {
        const { movies, updateStatus, readMoreButton } = this.props;
        return (
            <>
                <div className="cardSection">
                    <div className="container">
                        <Row justify="center">
                            {movies.map((data, index) => (

                                <Col key={index} xs={24} sm={14} md={12} lg={8} style={{ padding: 15 }}>
                                    <Card
                                        // style={{ width: 350 }}
                                        cover={<img alt="example" src={imageBasePath + data.backdrop_path} />}>
                                        <h3>{data.original_title}</h3>
                                        <p>Release Date: {data.release_date}</p> 
                                        <Meta description={data.overview} />
                                        <Button className="colorOfButton" onClick={(e) => updateStatus(index, data.id)}>{data.watchStatus ? "watched" : "Watch"}</Button>
                                        <Button className="colorOfButton" onClick={e => readMoreButton(data.id)}>Read More</Button>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

export default Cards;