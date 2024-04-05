import HelpCenterContent from 'components/Pages/HelpCenter/ArticleContent';

import { Container, maxMedia } from 'lib/styles';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 0;
  ${maxMedia.xsmall} {
    padding: 24px 0;
  }
`;

const SalesMottoContainer = () => {
  return (
    <Wrapper>
      <Container>
        <HelpCenterContent>
          <h1 style={{ marginBottom: 8 }}>PHƯƠNG CHÂM BÁN HÀNG NỘI THẤT SỐ</h1>
          <p>
            Với mục tiêu là trở thành một trong những trang bán đồ nội thất đầu Việt Nam. Nội Thất Số luôn cam
            kết 5 tiêu chí bán hàng để người tiêu dùng an tâm mua sắm.
          </p>
          <br />
          <h2>1. HÀNG CHÍNH HÃNG</h2>
          <p>
            Tất cả các sản phẩm được bán tại <a href='https://noithatso.com.vn'>Nội Thất Số</a> đều là hàng
            chính hãng của thương hiệu nội thất uy tín cùng với chế độ bảo hành chính hãng, nguyên đai nguyên
            kiện.
          </p>
          <br />
          <h2>2. GIÁ TỐT NHẤT</h2>
          <p>
            Các chương trình khuyến mãi, sự kiện ưu đãi được tổ chức thường xuyên có nhiều lợi ích hơn rất
            nhiều so với giá thị trường và giá niêm yết. Ngoài ra, Nội Thất Số còn được sự hỗ trợ từ các đối
            tác là các Công ty Nội thất hàng đầu để đưa ra nhiều chương trình ưu đãi cho khách hàng. Tất cả
            sản phẩm được bán tại Nội Thất Số đã bao gồm VAT.
          </p>
          <br />
          <h2>3. GIAO HÀNG TOÀN QUỐC</h2>
          <p>
            Nội Thất Số giao hàng toàn quốc tại 63 tỉnh thành. Dù Quý khách ở xa hay gần, khi có nhu cầu mua
            sản phẩm thì Nội Thất Số  sẽ giao hàng tới tận nơi cho Quý khách.
          </p>
          <br />
          <h2>4. PHỤC VỤ CHU ĐÁO</h2>
          <p>
            Với đội ngũ nhân viên được đào tạo bải bản, chuyên nghiệp sẽ giúp khách hàng hoàn toàn an tâm khi
            tham quan và mua sắm tại bất kỳ Trung tâm nào của Nội Thất Số trên toàn quốc. Mọi thắc mắc của Quý
            khách sẽ được nhân viên tư vấn và giải đáp một cách nhiệt tình.
          </p>
          <br />
          <h2>5. CHẾ ĐỘ HẬU MÃI TỐT</h2>
          <p>
            Các chế độ Bảo hành – Bảo trì đều được thực hiện đúng quy trình của Hãng sản xuất và theo quy định
            của <a href='https://noithatso.com.vn'>Nội Thất Số</a>. Sau khi mua sản phẩm nếu khách hàng cần tư
            vấn thêm về sản phẩm dịch vụ thì nhân viên Nội Thất Số đều sẵn sàng phục vụ và hỗ trợ.
          </p>
        </HelpCenterContent>
      </Container>
    </Wrapper>
  );
};

export default SalesMottoContainer;
