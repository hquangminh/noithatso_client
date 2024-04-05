import HelpCenterContent from 'components/Pages/HelpCenter/ArticleContent';

import { Container, maxMedia } from 'lib/styles';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  padding: 40px 0;
  ${maxMedia.xsmall} {
    padding: 24px 0;
  }
`;

const PrivacyPolicyContainer = () => {
  return (
    <Wrapper>
      <Container>
        <HelpCenterContent>
          <h1>CHÍNH SÁCH BẢO MẬT</h1>
          <h2>1. MỤC ĐÍCH VÀ PHẠM VI THU THẬP THÔNG TIN CÁ NHÂN</h2>
          <p>
            - Việc thu thập dữ liệu chủ yếu trên <a href='https://noithatso.com.vn'>noithatso.com.vn</a>, bao
            gồm địa chỉ email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng và IP (thành
            viên). Đây là các thông tin mà bắt buộc người dùng  trên noithatso.com.vn phải cung cấp khi đăng
            ký sử dụng dịch vụ và để noithatso.com.vn liên hệ xác nhận khi Quý khách đăng ký sử dụng dịch vụ
            trên trang web, nhằm đảm bảo quyền lợi cho cho người tiêu dùng.
          </p>
          <p>
            - Người dùng tự chịu trách nhiệm bảo mật tất cả hoạt động sử dụng dịch vụ dưới tên đăng ký, mật
            khẩu và hộp thư điện tử của bản thân. Ngoài ra, người dùng có trách nhiệm thông báo kịp thời cho
            noithatso.com.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm quy định bảo mật, lưu giữ
            tên đăng ký và mật khẩu của bên khác không phải chúng tôi để có biện pháp giải quyết phù hợp.
          </p>
          <br />
          <h2>2. PHẠM VI SỬ DỤNG THÔNG TIN</h2>
          <p>
            <a href='https://noithatso.com.vn'>noithatso.com.vn</a> sử dụng thông tin người dùng cung cấp các
            dịch vụ đến người dùng;
          </p>
          <p>
            Gửi các thông báo về các hoạt động trao đổi thông tin giữa người dùng thành viên và
            noithatso.com.vn;
          </p>
          <p>Ngăn chặn các hoạt động phá hủy tài khoản người dùng hoặc các hoạt động giả mạo;</p>
          <p>Dùng trong những trường hợp đặc biệt cần liên hệ và giải quyết với người dùng.</p>
          <p>
            Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan đến
            giao dịch tại noithatso.com.vn.
          </p>
          <p>
            Trong trường hợp có yêu cầu của pháp luật: noithatso.com.vn có trách nhiệm hợp tác cung cấp thông
            tin cá nhân người dùng khi có yêu cầu từ cơ quan tư pháp gồm Viện kiểm sát, tòa án, cơ quan công
            an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của người dùng. Ngoài ra, không ai có
            quyền xâm phạm vào thông tin cá nhân của người dùng.
          </p>
          <br />
          <h2>3. CAM KẾT VÀ BẢO MẬT THÔNG TIN KHÁCH HÀNG</h2>
          <p>
            Thông tin cá nhân của người dùng trên <a href='https://noithatso.com.vn'>noithatso.com.vn</a> được
            Nội Thất Số cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của
            noithatso.com.vn. Việc thu thập và sử dụng thông tin chỉ được thực hiện khi có sự đồng ý của người
            dùng trừ những trường hợp pháp luật có quy định khác.
          </p>
          <p>
            Nội Thất Số không sử dụng, chuyển giao, cung cấp hay tiết lộ cho bên nào khác về thông tin cá nhân
            của người dùng khi không có sự cho phép đồng ý từ người dùng.
          </p>
          <p>
            Trong trường hợp máy chủ lưu trữ thông tin bị người khác tấn công dẫn đến mất mát dữ liệu cá nhân
            của người dùng, Nội Thất Số sẽ thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và
            thông báo cho người dùng được biết.
          </p>
          <p>
            Mọi thông tin giao dịch trực tuyến của người dùng đều được bảo mật tuyệt đối bao gồm thông tin hóa
            đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn noithatso.com.vn.
          </p>
        </HelpCenterContent>
      </Container>
    </Wrapper>
  );
};

export default PrivacyPolicyContainer;
