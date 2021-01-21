import { Col, Row } from 'antd';
import styles from './Footer.module.scss'


const Footer = () => {
    return (
        <Row className={styles.footer}>
            <Col span={8}>AppCo</Col>
            <Col span={8}>All rights reserved by ThemeTags</Col>
            <Col span={8}>Copyrights © 2019.</Col>
        </Row>

    )
}


export default Footer;