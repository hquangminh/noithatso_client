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

const UserAgreementContainer = () => {
  return (
    <Wrapper>
      <Container>
        <HelpCenterContent>
          <h1 style={{ marginBottom: 8 }}>THỎA THUẬN NGƯỜI DÙNG</h1>
          <p>
            <a href='https://noithatso.com.vn'>noithatso.com.vn</a> cam kết sẽ bảo mật những thông tin riêng
            tư của Quý khách. Vui lòng đọc bản &quot;Chính sách bảo mật&quot; sau đây về những cam kết mà
            chúng tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập:
          </p>
          <h2>1. Thu thập thông tin cá nhân</h2>
          <p>
            Để truy cập và sử dụng một số dịch vụ tại noithatso.com.vn, Quý khách có thể sẽ được yêu cầu cung
            cấp thông tin cá nhân (Họ tên, Email, Số điện thoại liên lạc, Địa chỉ). Mọi thông tin được khai
            báo phải đảm bảo tính chính xác và hợp pháp.
          </p>
          <p>
            Chúng tôi cũng có thể thu thập thông tin về số lần truy cập, bao gồm số trang Quý khách xem, số
            links (liên kết) Quý khách click và những thông tin khác liên quan đến việc kết nối đến trang
            noithatso.com.vn. Chúng tôi cũng thu thập các thông tin mà trình duyệt Web của Quý khách sử dụng
            mỗi khi truy cập vào noithatso.com.vn, bao gồm: địa chỉ IP, loại trình duyệt, ngôn ngữ, thời gian
            và những địa chỉ mà trình duyệt truy xuất đến. Chúng tôi không chịu mọi trách nhiệm liên quan đến
            pháp luật của thông tin được khai báo.
          </p>
          <br />
          <h2>2. Sử dụng thông tin cá nhân</h2>
          <p>
            noithatso.com.vn thu thập và sử dụng thông tin cá nhân của Quý khách với mục đích phù hợp và cam
            kết tuân thủ nội dung của &quot;Chính sách bảo mật&quot; này. Chúng tôi cũng có thể sử dụng những
            thông tin này khi cần thiết để liên hệ trực tiếp với Quý khách dưới các hình thức như: gởi thư
            ngỏ, cập nhật trạng thái đơn đặt hàng, thư cảm ơn, thông tin về kỹ thuật và bảo mật.
          </p>
          <br />
          <h2>3. Chia sẻ thông tin cá nhân</h2>
          <p>
            Ngoại trừ các trường hợp về Sử dụng thông tin cá nhân như nội dung của thỏa thuận này, chúng tôi
            cam kết sẽ không tiết lộ thông tin cá nhân của Quý khách cho bên khác.
          </p>
          <p>
            Trong một số trường hợp, chúng tôi có thể thuê một đơn vị khác để tiến hành các dự án nghiên cứu
            thị trường. Khi đó, thông tin của Quý khách sẽ được cung cấp cho đơn vị này để thực hiện dự án.
            Đơn vị này sẽ bị ràng buộc bởi một thỏa thuận về bảo mật mà theo đó họ chỉ được phép sử dụng những
            thông tin được cung cấp cho mục đích hoàn thành dự án.
          </p>
          <p>
            Chúng tôi cũng có thể cung cấp thông tin cá nhân của Quý khách trong các trường hợp thật sự cần
            thiết như sau:
          </p>
          <p>(a) Khi nhận được yêu cầu của các cơ quan pháp luật;</p>
          <p>
            (b) Trong trường hợp mà chúng tôi tin rằng việc tiết lộ sẽ giúp chúng tôi bảo vệ quyền lợi chính
            đáng của mình trước pháp luật;
          </p>
          <p>
            (c) Tình huống khẩn cấp và cần thiết để bảo vệ quyền an toàn cá nhân của các thành viên
            noithatso.com.vn khác.
          </p>
          <br />
          <h2>4. Truy xuất thông tin cá nhân</h2>
          <p>
            Quý khách luôn được phép truy cập và chỉnh sửa những thông tin cá nhân của mình theo các liên kết
            thích hợp mà chúng tôi cung cấp tại bất ký thời điểm nào.
          </p>
          <br />
          <h2>5. Bảo mật thông tin cá nhân</h2>
          <p>
            noithatso.com.vn cam kết bảo mật thông tin cá nhân của Quý khách bằng mọi cách thức có thể. Nhằm
            bảo vệ thông tin này không bị truy lục, sử dụng hoặc tiết lộ ngoài ý muốn, chúng tôi sẽ sử dụng
            nhiều công nghệ bảo mật thông tin khác nhau.
          </p>
          <p>
            noithatso.com.vn khuyến cáo Quý khách nên bảo mật các thông tin liên quan đến mật khẩu truy xuất
            của Quý khách và không nên chia sẻ với bất kỳ người nào khác. Nếu sử dụng máy tính công cộng, Quý
            khách nên đăng xuất, hoặc thoát hết tất cả cửa sổ website đang mở.
          </p>
          <br />
          <h2>6. Quy định về &quot;Spam&quot;</h2>
          <p>
            noithatso.com.vn thực sự quan ngại đến vấn nạn Spam (thư rác) được gửi từ các Email giả mạo danh
            tín chúng tôi. Do đó, noithatso.com.vn khẳng định chỉ gởi Email đến Quý khách khi Quý khách có
            đăng ký hoặc sử dụng dịch vụ từ hệ thống của chúng tôi.
          </p>
          <p>
            noithatso.com.vn cam kết không bán, thuê lại hoặc cho thuê email của Quý khách từ bên thứ ba. Nếu
            Quý khách vô tình nhận được Email không mong muốn từ hệ thống của chúng tôi do nguyên nhân ngoài ý
            muốn, xin vui lòng nhấn vào link “từ chối nhận Email này” đính kèm, hoặc thông báo trực tiếp đến
            ban quản trị Website.
          </p>
          <br />
          <h2>7. Thay đổi về chính sách</h2>
          <p>
            Nội dung của &quot;Chính sách bảo mật&quot; này có thể thay đổi để phù hợp với các nhu cầu của
            noithatso.com.vn cũng như nhu cầu và sự phản hồi từ khách hàng nếu có. Khi cập nhật nội dung chính
            sách này, chúng tôi sẽ chỉnh sửa lại thời gian &quot;Cập nhật lần cuối&quot; bên trên.
          </p>
          <p>
            Nội dung &quot;Chính sách bảo mật này chỉ áp dụng tại noithatso.com.vn, không bao gồm hoặc liên
            quan đến các bên thứ ba đặt quảng cáo hay có links tại noithatso.com.vn. Do đó, chúng tôi đề nghị
            Quý khách đọc và tham khảo kỹ nội dung &quot;Chính sách bảo mật&quot; của từng website mà Quý
            khách đang truy cập.
          </p>
          <br />
          <h2>8. Thông tin liên hệ</h2>
          <p>
            Chúng tôi luôn hoan nghênh các ý kiến đóng góp, liên hệ và phản hồi từ Quý khách về Chính sách bảo
            mật này. Nếu Quý khách có thêm thắc mắc liên quan, xin vui lòng liên hệ qua địa chỉ Email:
            <a href='mailto:contact@noithatso.com.vn'>contact@noithatso.com.vn</a>.
          </p>
        </HelpCenterContent>
      </Container>
    </Wrapper>
  );
};

export default UserAgreementContainer;
