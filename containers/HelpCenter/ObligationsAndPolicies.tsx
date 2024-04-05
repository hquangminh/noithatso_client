import HelpCenterContent from 'components/Pages/HelpCenter/ArticleContent';

import { Container, maxMedia } from 'lib/styles';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 0;

  h3 {
    margin-top: 20px;
  }

  p.note:before {
    content: '* ';
    color: #ea3335;
  }

  ${maxMedia.xsmall} {
    padding: 24px 0;
  }
`;

const ObligationsAndPoliciesContainer = () => {
  return (
    <Wrapper>
      <Container>
        <HelpCenterContent>
          <h1>QUY ĐỊNH VỀ NGHĨA VỤ VÀ CHÍNH SÁCH CHUNG</h1>
          <h2>1. Quy định về nghĩa vụ của Nội Thất Số và khách hàng</h2>
          <h3>1.1. Nghĩa vụ của Nội Thất Số</h3>
          <p>
            – Hướng dẫn, tư vấn và cung cấp tất cả các thông tin liên quan tới sản phẩm nội thất trên trang
            web để khách hàng hiểu và sử dụng được dịch vụ.
          </p>
          <p>
            – Giao hàng đẩy đủ và đúng sản phẩm trong thời hạn sau khi khách hàng đã đặt đơn trên website
            noithatso.com.vn.
          </p>
          <p>
            – Hỗ trợ khách hàng trong việc giải quyết các khiếu nại, thắc mắc và những khó khăn trong quá
            trình đặt, nhận hàng và sử dụng sản phẩm.
          </p>
          <p>
            – Cung cấp các chứng từ liên quan tới việc khách hàng thanh toán cho Nội Thất Số như phiếu thu,
            hóa đơn,…
          </p>
          <h2>1.2. Nghĩa vụ của khách hàng</h2>
          <p>– Thực hiện đúng các quy trình, quy định liên quan tới dịch vụ do Nội Thất Số quy định.</p>
          <p>
            – Thanh toán cho Nội Thất Số đầy đủ số tiền theo đơn hợp đồng hoặc đơn hàng kèm theo các chứng từ,
            hóa đơn theo quy định (Nếu có).
          </p>
          <p>
            – Hỗ trợ và cung cấp thông tin đầy đủ cho Nội Thất Số liên quan tới các giao dịch khi doanh nghiệp
            có yêu cầu.
          </p>
          <br />
          <h2>2. Chính sách</h2>
          <h3>2.1. Chính sách thanh toán</h3>
          <p>
            Khách hàng thanh toán trước 100% tổng giá trị đơn hàng và chi phí vận chuyển (nếu có) và nhận đầy
            đủ xác nhận, hóa đơn thanh toán từ Nội Thất Số.
          </p>
          <h3>2.2. Chính sách khiếu nại</h3>
          <p>
            – Tiếp nhận mọi yêu cầu, khiếu nại của khách hàng liên quan đến sử dụng dịch vụ và sản phẩm trên
            trang web noithatso.com.vn.
          </p>
          <p>
            – Tất cả mọi trường hợp bảo hành, khách hàng liên hệ trực tiếp với bộ phận chăm sóc khách hàng để
            làm thủ tục bảo hành.
          </p>
          <h3>2.3. Chính sách vận chuyển - giao nhận</h3>
          <p>– Nội Thất Số nhận vận chuyển hàng toàn quốc.</p>
          <p>– Khách hàng liên hệ qua Email contact@noithatso.com.vn để được báo giá chi phí vận chuyển.</p>
          <h3>2.4. Chính sách lắp đặt</h3>
          <p>
            – Khách hàng tự lắp đặt các sản phẩm nội thất đã mua tại Nội Thất Số dựa theo bản hướng dẫn chi
            tiết của được chúng tôi gửi kèm theo.
          </p>
          <h3>2.5. Chính sách về đổi trả và hoàn tiền</h3>
          <p className='note'>Trường hợp được đổi/ trả hàng:</p>
          <p>
            – Sản phẩm bị lỗi hoặc quá hạn sử dụng: Khách hàng vui lòng kiểm tra trước khi nhận hàng. Trong
            trường hợp sản phẩm bị hư hại trong quá trình giao hàng, Quý khách vui lòng từ chối và gửi lại sản
            phẩm cho chúng tôi.
          </p>
          <p>
            - Sản phẩm không đúng với đơn đặt hàng: Khi nhận được sản phẩm không đúng với đơn đã đặt hàng, Quý
            khách hãy liên hệ trực tiếp càng sớm càng tốt với Nội Thất Số để chúng tôi tiến hành kiểm tra.
            Trong trường hợp do Nội Thất Số sơ sót gửi nhầm, chúng tôi sẽ thay thế đúng sản phẩm khách hàng đã
            yêu cầu.
          </p>
          <p className='note'>Điều kiện đổi/ trả hàng:</p>
          <p>
            – Khách hàng có thể liên hệ trực tiếp với bộ phận chăm sóc khách hàng của Nội Thất Số để yêu cầu
            đổi trả hàng.
          </p>
          <p>– Sản phẩm đổi/ trả phải thỏa mãn các điều kiện sau:</p>
          <p>+ Còn nguyên đai, nguyên kiện</p>
          <p>+ Phiếu bảo hành và tem của Công ty trên sản phẩm còn nguyên vẹn</p>
          <p>+ Sản phẩm còn đầy đủ hộp, giấy hướng dẫn và chưa được sử dụng</p>
          <p className='note'>Quy trình đổi/ trả sản phẩm.</p>
          <p>
            Bước 1: Sau khi nhận sản phẩm, khách hàng vui lòng kiểm tra thật kỹ lưỡng. Nếu có vấn đề, hãy trực
            tiếp liên lạc với bộ phận chăm sóc khách hàng của Nội Thất Số tại thời điểm nhân viên giao hàng
            còn ở đó để được giải quyết nhanh nhất. Trường hợp nhân viên giao hàng đã đi khỏi, nếu muốn đổi/
            trả sản phẩm hãy liên hệ với chúng tôi để  được tư vấn và hẹn lịch đổi/ trả sản phẩm.
          </p>
          <p>
            Bước 2: Sau khi liên lạc với Nội Thất Số, chúng tôi sẽ thông báo lịch hẹn đổi/ trả sản phẩm cho
            khách hàng.
          </p>
        </HelpCenterContent>
      </Container>
    </Wrapper>
  );
};

export default ObligationsAndPoliciesContainer;
