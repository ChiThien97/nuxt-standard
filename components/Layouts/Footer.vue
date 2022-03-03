<template>
  <footer v-lazy-container="{ selector: 'img' }" class="cps-footer">
    <div class="cps-footer__top">
      <div class="cps-container">
        <b-row>
          <b-col cols="12" sm="6" md="6" lg="3" xl="3" class="top__box-one">
            <div class="box-one__store">
              <div class="store__title m-b-5">
                <p class="m-0 title">Tìm cửa hàng</p>
              </div>
              <div class="store__content">
                <ul class="list-link">
                  <li class="link">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/dia-chi-cua-hang"
                    >Tìm cửa hàng gần nhất</a
                    >
                  </li>
                  <li class="link">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/chinh-sach-giao-hang"
                    >
                      Mua hàng từ xa</a
                    >
                  </li>
                  <li class="link link--red">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/dia-chi-cua-hang"
                    >
                      Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="box-one__pay-gate-way">
              <div class="pay-gate-way__title">
                <p class="title m-b-0">Phương thức thanh toán</p>
              </div>
              <div class="pay-gate-way__content">
                <ul class="list-link">
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/huong-dan-mua-hang-online"
                    >
                      <em class="icon-cps border rounded icon-cps-visa"></em
                      ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/huong-dan-mua-hang-online"
                    >
                      <em
                        class="icon-cps border rounded icon-cps-mastercard"
                      ></em
                      ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/huong-dan-mua-hang-online"
                    >
                      <em class="icon-cps border rounded icon-cps-atm"></em
                      ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/huong-dan-mua-hang-online"
                    >
                      <em class="icon-cps border rounded icon-cps-alepay"></em
                      ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/sforum/huong-dan-toan-bang-zalopay-khi-mua-hang-tren-website-cellphones"
                    >
                      <em class="icon-cps border rounded icon-cps-zalopay"></em
                      ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/sforum/huong-dan-su-dung-vnpay-qrcode-tren-website-cellphones"
                    ><em class="icon-cps border rounded icon-cps-vnpay"></em
                    ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/sforum/huong-dan-thanh-toan-bang-vi-momo-khi-mua-hang-tren-website-cellphones"
                    ><em class="icon-cps border rounded icon-cps-moca"></em
                    ></a>
                  </li>
                  <li class="link m-t-5 p-r-5">
                    <a
                      target="_blank"
                      href="https://cellphones.com.vn/huong-dan-mua-hang-online"
                    ><em class="icon-cps border rounded icon-cps-mpos"></em
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </b-col>
          <b-col
            cols="12"
            sm="6"
            md="6"
            lg="3"
            xl="3"
            class="m-b-10 top__box-two"
          >
            <div class="box-two__call m-b-15">
              <ul class="list-link">
                <li class="link">
                  Gọi mua hàng
                  <a target="_blank" href="tel:18002044"
                  ><strong>1800.2044</strong></a
                  >&nbsp;(8h00 - 22h00)
                </li>
                <li class="link">
                  Goi khiếu nại
                  <a target="_blank" href="tel:18002063"
                  ><strong>1800.2063</strong></a
                  >&nbsp;(8h00 - 21h30)
                </li>
                <li class="link">
                  Gọi bảo hành
                  <a target="_blank" href="tel:18002064"
                  ><strong>1800.2064</strong></a
                  >&nbsp;(8h00 - 21h00)
                </li>
              </ul>
            </div>
            <div class="box-two__warranty">
              <div class="warranty__title">
                <p class="m-0 title">Đối tác dịch vụ bảo hành</p>
              </div>
              <div class="warranty__sub-information">
                <p class="text">Điện Thoại - Máy tính</p>
              </div>
              <div class="warranty--logo">
                <a target="_blank" href="https://dienthoaivui.com.vn/"
                ><em class="icon-dtv"></em
                ></a>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="6" md="6" lg="3" xl="3" class="top__box-three">
            <div class="box-three__search">
              <ul class="list-link">
                <li v-for="item in Search"
                    :key="JSON.stringify(item)"
                    class="link">
                  <a target="_blank" :href="item.link">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </b-col>
          <b-col cols="12" sm="6" md="6" lg="3" xl="3" class="top__box-four">
            <div class="box-four--information">
              <ul class="list-link">
                <li
                  v-for="item in Information"
                  :key="JSON.stringify(item)"
                  class="link"
                >
                  <a target="_blank" :href="item.link">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="cps-footer__bottom">
      <div class="cps-container">
        <div class="bottom__cms">
          <b-row>
            <b-col
              v-for="row in CMS"
              :key="JSON.stringify(row)"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="4"
              class="cms__cms-row">
              <span
                v-for="(rowItem, ind) in row"
                :key="JSON.stringify(rowItem)"
                class="cms-row__cms-line">
                <span
                  v-for="(item, index) in rowItem"
                  :key="JSON.stringify(item)">
                  <span v-if="item.link !== ''">
                     <a target="_blank"
                        :href="item.link">
                      <span>{{ item.title }}</span>
                    </a>
                    <span v-if="index !== rowItem.length - 1">&nbsp;–&nbsp;</span>
                  </span>
                 <span v-else>
                   <a target="_blank">
                    <span>{{ item.title }}</span>
                  </a>
                  <span v-if="index !== rowItem.length - 1">&nbsp;–&nbsp;</span>
                 </span>
                </span>

                <br v-if="ind !== row.length - 1"/>
              </span>
            </b-col>
          </b-row>
        </div>
        <div class="bottom__company-information">
          <b-col>
            <b-row class="company-information__address">
              <p>
                Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
                0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ:
                350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí
                Minh, Việt Nam. Điện thoại: 028.7108.9666.
              </p>
            </b-row>
            <b-row class="company-information__certification">
              <a
                target="_blank"
                class="icon-cps icon-cps-tb"
                href="http://online.gov.vn/Home/WebDetails/75641"
                rel="nofollow"
              ></a>
              <a
                target="_blank"
                href="https://www.dmca.com/Protection/Status.aspx?ID=158f5667-cce3-4a18-b2d1-826225e6b022&amp;refurl=https://cellphones.com.vn/iphone-11.html"
                title="DMCA.com Protection Status"
                class="dmca-badge m-l-5"
              >
                <img
                  data-src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
                  alt="DMCA.com Protection Status"
                  height="20"
                  width="96"
                />
              </a>
            </b-row>
          </b-col>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
const CMS = [
  [
    [
      {
        title: "Điện thoại smartphone",
        link: "https://cellphones.com.vn/mobile.html",
      },
      {
        title: "Máy tính bảng",
        link: "https://cellphones.com.vn/tablet.html",
      },
      {
        title: "Quà tặng Tết 2022",
        link: "https://cellphones.com.vn/uu-dai-tet/",
      },
    ],
    [
      {
        title: "Điện thoại iPhone 11",
        link: "https://cellphones.com.vn/iphone-11.html",
      },
      {
        title: "Điện thoại iPhone 12",
        link: "https://cellphones.com.vn/mobile/apple/iphone-12-vna.html",
      },
      {
        title: "Điện thoại iPhone 13",
        link: "https://cellphones.com.vn/mobile/apple/iphone-13.html",
      },
    ],
    [
      {
        title: "Điện thoại Samsung Galaxy Z Fold 3",
        link: "https://cellphones.com.vn/samsung-galaxy-z-fold-3.html",
      },
      {
        title: "Đồng hồ Apple Watch Series 7",
        link: "https://cellphones.com.vn/do-choi-cong-nghe/apple-watch/series-7.html",
      },
    ],
  ],
  [
    [
      {
        title: "Chuyên mục điện thoại nổi bật",
        link: "",
      },
    ],
    [
      {
        title: "Điện thoại Apple iPhone",
        link: "https://cellphones.com.vn/mobile/apple.html",
      },
      {
        title: "Điện thoại Samsung Galaxy",
        link: "https://cellphones.com.vn/mobile/samsung.html",
      },
      {
        title: "Điện thoại Xiaomi",
        link: "https://cellphones.com.vn/mobile/xiaomi.html",
      },
    ],
    [
      {
        title: "Điện thoại OPPO",
        link: "https://cellphones.com.vn/mobile/oppo.html",
      },
      {
        title: " Điện thoại Vivo",
        link: "https://cellphones.com.vn/mobile/vivo.html",
      },
      {
        title: "Điện thoại OnePlus",
        link: "https://cellphones.com.vn/mobile/oneplus.html",
      },
      {
        title: "Điện thoại Nokia",
        link: "https://cellphones.com.vn/mobile/nokia.html",
      },
    ],
  ],
  [
    [
      {
        title: "Laptop",
        link: "https://cellphones.com.vn/laptop.html",
      },
      {
        title: "Laptop HP",
        link: "https://cellphones.com.vn/laptop/hp.html",
      },
      {
        title: "Máy tính để bàn PC",
        link: "https://cellphones.com.vn/may-tinh-de-ban.html",
      },
      {
        title: "Màn hình máy tính",
        link: "https://cellphones.com.vn/man-hinh.html",
      },
    ],
    [
      {
        title: "Máy hút bụi",
        link: "https://cellphones.com.vn/nha-thong-minh/may-hut-bui.html",
      },
      {
        title: "Robot hút bụi",
        link: "https://cellphones.com.vn/nha-thong-minh/may-hut-bui/robot-hut-bui.html",
      },
      {
        title: "Robot hút bụi Xiaomi",
        link: "https://cellphones.com.vn/nha-thong-minh/may-hut-bui/robot-hut-bui/robot-hut-bui-xiaomi.html",
      },
      {
        title: "Sim số đẹp",
        link: "https://cellphones.com.vn/sim-3g-4g-nghe-goi.html",
      },
    ],
    [
      {
        title: "Camera",
        link: "https://cellphones.com.vn/phu-kien/camera.html",
      },
      {
        title: "Camera hành trình",
        link: "https://cellphones.com.vn/phu-kien/camera/hanh-trinh.html",
      },
      {
        title: "Camera hành trình Vietmap",
        link: "https://cellphones.com.vn/phu-kien/camera/hanh-trinh/vietmap.html",
      },
    ],
  ],
];

const Search = [
  {
    title: "Mua hàng và thanh toán Online",
    link: "https://cellphones.com.vn/chinh-sach-giao-hang",
  },
  {
    title: "Mua hàng trả góp Online",
    link: "https://cellphones.com.vn/tra-gop-online-the-tin-dung",
  },
  {
    title: "Tra thông tin đơn hàng",
    link: "https://cellphones.com.vn/chinh-sach-giao-hang",
  },
  {
    title: "Tra điểm Smember",
    link: "https://cellphones.com.vn/smember/",
  },
  {
    title: "Tra thông tin bảo hành",
    link: "https://dienthoaivui.com.vn/kt/",
  },
  {
    title: "Tra cứu hoá đơn điện tử",
    link: "https://hddt.cellphones.com.vn/",
  },
  {
    title: "Trung tâm bảo hành chính hãng",
    link: "https://cellphones.com.vn/mobile/",
  },
  {
    title: "Quy định về việc sao lưu dữ liệu",
    link: "https://cellphones.com.vn/quy-dinh-ve-viec-sao-luu-du-lieu",
  },
  {
    title: "Dịch vụ bảo hành điện thoại",
    link: "https://cellphones.com.vn/sua-chua-phan-cung.html",
  },
];

const Information = [
  {
    title: "Quy chế hoạt động",
    link: "https://cellphones.com.vn/tos",
  },
  {
    title: "Chính sách Bảo hành",
    link: "https://cellphones.com.vn/chinh-sach-bao-hanh",
  },
  {
    title: "Liên hệ hợp tác kinh doanh",
    link: "https://cellphones.com.vn/lien-he-hop-tac",
  },
  {
    title: "Đơn Doanh nghiệp",
    link: "https://cellphones.com.vn/dich-vu-khach-hang-doanh-nghiep",
  },
  {
    title: "Ưu đãi từ đối tác",
    link: "https://cellphones.com.vn/uu-dai-doi-tac",
  },
  {
    title: "Tuyển dụng",
    link: "https://tuyendung.cellphones.com.vn/",
  },
];

export default {
  use() {
    // VueLazyload
  },
  name: "Header",
  data() {
    return {
      CMS,
      Information,
      Search,
    };
  },
};
</script>
