/**
 * UTC Cinema - Dữ liệu trung tâm (Centralized Mock Database)
 * Dự án Web Bán Vé & Quản Lý Rạp Chiếu Phim Sinh Viên Trường Đại học Giao thông Vận tải
 * Danh sách phim đang chiếu và sắp chiếu thực tế chuẩn rạp CGV Việt Nam (Cập nhật 10/2026)
 */

const CineVerseData = {
  // 1. CẤU HÌNH THƯƠNG HIỆU
  brand: {
    name: "UTC Cinema",
    subName: "Đại học Giao thông Vận tải",
    slogan: "Không Gian Điện Ảnh Trẻ - Đỉnh Cao Trải Nghiệm Sinh Viên UTC",
    hotline: "024 3766 3311 (Văn phòng Đoàn UTC)",
    email: "cinema@utc.edu.vn",
    address: "Số 3 Phố Cầu Giấy, Phường Láng Thượng, Quận Đống Đa, Hà Nội",
    socials: {
      facebook: "https://facebook.com/utc.edu.vn",
      youtube: "https://youtube.com/@UTC_Channel",
      instagram: "https://instagram.com/utc_cinema"
    }
  },

  // 2. DANH SÁCH RẠP CHIẾU THEO CƠ SỞ TRƯỜNG & KHU VỰC
  cinemas: [
    {
      id: "utc-caugiay-cs1",
      name: "UTC Cinema - Hội Trường A5 (Cơ sở chính Hà Nội)",
      city: "Hà Nội",
      address: "Hội trường lớn A5, Trường ĐH Giao thông Vận tải, Số 3 Cầu Giấy, Đống Đa, Hà Nội",
      rooms: ["Rạp 1 (Hội trường A5 - Màn hình IMAX Laser)", "Rạp 2 (Dolby Atmos)", "Rạp 3 (VIP Room)"]
    },
    {
      id: "utc-caugiay-center",
      name: "UTC Cinema - Discovery Center Cầu Giấy",
      city: "Hà Nội",
      address: "Tầng 5, Discovery Complex, 302 Cầu Giấy (Cách cổng trường UTC 500m)",
      rooms: ["Rạp 1 (IMAX)", "Rạp 2 (Dolby Atmos)", "Rạp 3 (Sweetbox Cặp đôi)"]
    },
    {
      id: "utc-hcm",
      name: "UTC Cinema - Phân hiệu TP. Hồ Chí Minh",
      city: "TP. Hồ Chí Minh",
      address: "Khu nhà đa năng, 450-451 Lê Văn Việt, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TP.HCM",
      rooms: ["Rạp 1 (Hội trường C1)", "Rạp 2 (Standard Dolby 7.1)"]
    }
  ],

  // 3. DANH SÁCH PHIM ĐANG CHIẾU & SẮP CHIẾU THỰC TẾ (NGUỒN CGV VIỆT NAM)
  movies: [
    // --- PHIM ĐANG CHIẾU (NOW SHOWING) ---
    {
      id: "trai-buon-nguoi",
      title: "Trại Buôn Người",
      originalTitle: "Trại Buôn Người",
      poster: "assets/images/trai-buon-nguoi.jpg",
      banner: "assets/images/trai-buon-nguoi.jpg",
      duration: 135,
      genre: ["Hành động", "Hồi hộp", "Tâm lý"],
      releaseDate: "2026-09-25",
      rating: 9.3,
      ageRating: "T18",
      ageDescription: "Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      director: "Toni Dương Bảo Anh",
      actors: "Steven Nguyễn, Quách Ngọc Ngoan, Tùng Mint, Huỳnh Minh Kiên",
      language: "Tiếng Việt",
      format: ["2D", "4DX", "Starium", "ULTRA 4DX"],
      status: "now_showing",
      trailerId: "73_1biulkYk",
      description: "Vì cứu em gái sa bẫy buôn người ở vùng biên giới Tây Nam, Ny (Steven Nguyễn) cùng người bạn chí cốt bị bắt làm nô dịch trong sào huyệt lừa đảo khét tiếng. Tại đây, họ cùng các trinh sát nằm vùng âm thầm liên kết các nạn nhân, vượt qua đòn roi tra tấn tàn khốc để lên kế hoạch đào thoát sinh tử.",
      showtimes: ["10:15", "13:30", "16:45", "19:30", "22:15"]
    },
    {
      id: "avengers-endgame-encore",
      title: "Avengers: Hồi Kết (Bản Chiếu Lại Đặc Biệt)",
      originalTitle: "Avengers: Endgame Encore (Rerun)",
      poster: "assets/images/avengers-endgame.jpg",
      banner: "assets/images/avengers-endgame.jpg",
      duration: 183,
      genre: ["Hành động", "Khoa học viễn tưởng", "Phiêu lưu"],
      releaseDate: "2026-09-25",
      rating: 9.9,
      ageRating: "T13",
      ageDescription: "Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      director: "Anthony Russo, Joe Russo",
      actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson",
      language: "Tiếng Anh - Phụ đề tiếng Việt",
      format: ["2D", "IMAX 2D", "4DX", "ScreenX", "Starium"],
      status: "now_showing",
      trailerId: "TcMBFSGVi1c",
      description: "Sau khi Thanos dùng Găng tay Vô cực xóa sổ một nửa sinh linh toàn cõi vũ trụ, các thành viên biệt đội Avengers sống sót chìm trong đau thương và chia rẽ. Khi cơ hội du hành lượng tử mở ra, họ tái xuất trong trận quyết chiến vĩ đại nhất lịch sử điện ảnh siêu anh hùng để đảo ngược định mệnh.",
      showtimes: ["09:00", "13:00", "17:00", "20:30"]
    },
    {
      id: "trai-tim-quai-thu",
      title: "Trái Tim Quái Thú",
      originalTitle: "Heart Of The Beast",
      poster: "assets/images/trai-tim-quai-thu.jpg",
      banner: "assets/images/trai-tim-quai-thu.jpg",
      duration: 101,
      genre: ["Hành động", "Kịch tính"],
      releaseDate: "2026-10-02",
      rating: 8.9,
      ageRating: "T13",
      ageDescription: "Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      director: "David Ayer",
      actors: "Brad Pitt, Shia LaBeouf, Logan Lerman",
      language: "Tiếng Anh - Phụ đề tiếng Việt",
      format: ["2D"],
      status: "now_showing",
      trailerId: "__2bjWbetsA",
      description: "Một cựu đặc nhiệm hải quân SEAL sống ẩn dật cùng người bạn bốn chân trung thành nơi rừng núi hoang sơ. Sự bình yên bị phá vỡ khi hang ổ của anh rơi vào tầm ngắm của một đường dây buôn lậu vũ khí tàn độc, buộc cả hai phải tái xuất trong cuộc chiến sinh tồn không khoan nhượng.",
      showtimes: ["11:00", "14:15", "17:45", "20:15", "22:30"]
    },
    {
      id: "scotty-giai-cuu-hoang-thuong",
      title: "Scotty: Giải Cứu Hoàng Thượng",
      originalTitle: "Scotty",
      poster: "assets/images/scotty.jpg",
      banner: "assets/images/scotty.jpg",
      duration: 80,
      genre: ["Hoạt hình", "Gia đình", "Hài hước", "Phiêu lưu"],
      releaseDate: "2026-10-02",
      rating: 9.0,
      ageRating: "P",
      ageDescription: "Phim phổ biến tới mọi lứa tuổi khán giả",
      director: "Mark Dindal",
      actors: "Chris Pratt, Samuel L. Jackson, Hannah Waddingham",
      language: "Lồng tiếng & Phụ đề tiếng Việt",
      format: ["2D"],
      status: "now_showing",
      trailerId: "67vbA5ZJod8",
      description: "Một chuyến phiêu lưu đại náo thành phố siêu dễ thương của chú chó Scotty quả cảm trên con đường giải cứu chú mèo 'hoàng thượng' quý tộc đỏng đảnh khỏi nanh vuốt của băng nhóm bắt cóc thú cưng tinh quái.",
      showtimes: ["09:15", "11:30", "14:00", "16:30", "18:45"]
    },
    {
      id: "master-zhong",
      title: "Thần Sư Chung Quỳ: Linh Giới Đại Chiến",
      originalTitle: "Master Zhong",
      poster: "assets/images/chung-quy.jpg",
      banner: "assets/images/chung-quy.jpg",
      duration: 96,
      genre: ["Hành động", "Hoạt hình", "Phiêu lưu", "Thần thoại"],
      releaseDate: "2026-10-02",
      rating: 8.8,
      ageRating: "T13",
      ageDescription: "Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      director: "Trần Khôn",
      actors: "Lý Băng Băng, Trần Khôn, Triệu Văn Tuyên",
      language: "Thuyết minh & Phụ đề tiếng Việt",
      format: ["2D"],
      status: "now_showing",
      trailerId: "u2NuUWsw_L4",
      description: "Khi đại kết giới ngăn cách giữa tam giới bị ma vương xé toạc, Thần sư Chung Quỳ cùng các thánh khí ngàn năm phải dấn thân vào sâu trong sương mù cõi âm để phong ấn vạn quỷ, lập lại trật tự cho nhân gian.",
      showtimes: ["10:45", "13:15", "15:45", "18:15", "21:00"]
    },
    {
      id: "khoa-chat-cua-nao-suzume",
      title: "Khóa Chặt Cửa Nào Suzume (Chiếu Lại)",
      originalTitle: "Suzume (Rerun)",
      poster: "assets/images/suzume.jpg",
      banner: "assets/images/suzume.jpg",
      duration: 122,
      genre: ["Hoạt hình", "Kỳ ảo", "Tình cảm", "Phiêu lưu"],
      releaseDate: "2026-10-02",
      rating: 9.7,
      ageRating: "P",
      ageDescription: "Phim phổ biến tới mọi lứa tuổi khán giả",
      director: "Makoto Shinkai",
      actors: "Nanoka Hara, Hokuto Matsumura, Eri Fukatsu",
      language: "Tiếng Nhật - Phụ đề & Lồng tiếng Việt",
      format: ["2D", "Starium"],
      status: "now_showing",
      trailerId: "F7nQ088287s",
      description: "Kiệt tác hoạt hình xúc động của 'phù thủy nỗi buồn' Makoto Shinkai. Nữ sinh 17 tuổi Suzume cùng chàng trai bí ẩn Souta - người mang sứ mệnh đóng các 'cánh cửa thảm họa' - rong ruổi khắp nước Nhật để ngăn chặn hiểm họa động đất tàn phá quê hương.",
      showtimes: ["09:45", "12:45", "15:30", "18:30", "21:15"]
    },
    {
      id: "wild-robot",
      title: "Robot Hoang Dã",
      originalTitle: "The Wild Robot",
      poster: "assets/images/wild-robot.jpg",
      banner: "assets/images/wild-robot.jpg",
      duration: 102,
      genre: ["Hoạt hình", "Phiêu lưu", "Gia đình", "Khoa học viễn tưởng"],
      releaseDate: "2026-09-27",
      rating: 9.8,
      ageRating: "P",
      ageDescription: "Phim phổ biến tới mọi lứa tuổi khán giả",
      director: "Chris Sanders",
      actors: "Lupita Nyong'o, Pedro Pascal, Kit Connor, Bill Nighy",
      language: "Tiếng Anh - Phụ đề & Lồng tiếng Việt",
      format: ["2D", "3D", "IMAX 2D"],
      status: "now_showing",
      trailerId: "67vbA5ZJod8",
      description: "Sau tai nạn đắm tàu, đơn vị robot thông minh ROZZUM 7134 ('Roz') dạt vào đảo hoang sơ. Roz học cách thích nghi với thiên nhiên, thấu hiểu muôn loài và trở thành người mẹ nuôi của chú ngỗng mồ côi Brightbill trong tác phẩm cảm động nhất năm của DreamWorks.",
      showtimes: ["10:00", "12:15", "14:30", "17:00", "19:15", "21:30"]
    },
    {
      id: "len-huong",
      title: "Lên Hương",
      originalTitle: "Luck For Sale",
      poster: "assets/images/len-huong.jpg",
      banner: "assets/images/len-huong.jpg",
      duration: 121,
      genre: ["Gia đình", "Tâm lý", "Hài hước"],
      releaseDate: "2026-09-18",
      rating: 9.1,
      ageRating: "T16",
      ageDescription: "Phim dành cho khán giả từ đủ 16 tuổi trở lên (16+)",
      director: "Nguyễn Quang Dũng",
      actors: "Thái Hòa, Thu Trang, Kiều Minh Tuấn",
      language: "Tiếng Việt",
      format: ["2D", "Starium"],
      status: "now_showing",
      trailerId: "6OqjF4UeR6Y",
      description: "Gia đình nghèo bất ngờ trúng giải độc đắc hàng trăm tỷ đồng, kéo theo những màn biến hình dở khóc dở cười, sự cám dỗ của đồng tiền và những biến cố thử thách tình cảm gia đình bền chặt.",
      showtimes: ["11:30", "14:45", "18:00", "20:45"]
    },
    {
      id: "laputa-lau-dai-tren-khong",
      title: "Laputa: Lâu Đài Trên Không",
      originalTitle: "Castle In The Sky (Studio Ghibli)",
      poster: "assets/images/laputa.jpg",
      banner: "assets/images/laputa.jpg",
      duration: 129,
      genre: ["Hoạt hình", "Phiêu lưu", "Kỳ ảo"],
      releaseDate: "2026-09-25",
      rating: 9.6,
      ageRating: "K",
      ageDescription: "Phim dành cho người xem dưới 13 tuổi có người bảo hộ",
      director: "Hayao Miyazaki",
      actors: "Keiko Yokozawa, Mayumi Tanaka, Minori Terada",
      language: "Tiếng Nhật - Phụ đề tiếng Việt",
      format: ["2D"],
      status: "now_showing",
      trailerId: "77kUj6kC_uA",
      description: "Tác phẩm huyền thoại mở màn chuỗi phim Studio Ghibli Fest tại rạp. Pazu và Sheeta mang theo viên đá phát sáng lơ lửng, cùng nhau khám phá bí mật hòn đảo bay Laputa bị lãng quên giữa các tầng mây.",
      showtimes: ["09:30", "13:30", "16:15", "19:00"]
    },
    {
      id: "chiikawa-dao-nguoi-ca",
      title: "Chiikawa: Bí Mật Đảo Người Cá",
      originalTitle: "Chiikawa The Movie: The Secret of The Mermaid Island",
      poster: "assets/images/chiikawa.jpg",
      banner: "assets/images/chiikawa.jpg",
      duration: 99,
      genre: ["Hoạt hình", "Hài hước", "Phiêu lưu"],
      releaseDate: "2026-08-28",
      rating: 9.4,
      ageRating: "P",
      ageDescription: "Phim phổ biến tới mọi lứa tuổi khán giả",
      director: "Takenori Mihara",
      actors: "Makoto Aoki, Seiran Kobayashi",
      language: "Lồng tiếng & Phụ đề tiếng Việt",
      format: ["2D"],
      status: "now_showing",
      trailerId: "u2NuUWsw_L4",
      description: "Cơn sốt dễ thương toàn châu Á! Chiikawa, Hachiware và Usagi có cơ hội trúng chuyến phiêu lưu đến đảo người cá đầy ắp món ngon nhưng cũng ẩn chứa những bí mật không ngờ.",
      showtimes: ["10:00", "12:00", "14:00", "16:00"]
    },

    // --- PHIM SẮP CHIẾU (COMING SOON) ---
    {
      id: "blue-lock-movie",
      title: "Blue Lock: Cuộc Chiến Của Những Tiền Đạo",
      originalTitle: "Blue Lock Part 1: Episode Nagi",
      poster: "assets/images/blue-lock.jpg",
      banner: "assets/images/blue-lock.jpg",
      duration: 127,
      genre: ["Hoạt hình", "Hành động", "Thể thao", "Tâm lý"],
      releaseDate: "2026-10-09",
      rating: 9.5,
      ageRating: "K",
      ageDescription: "Phim dành cho người xem dưới 13 tuổi có người bảo hộ",
      director: "Shunsuke Ishikawa",
      actors: "Nobunaga Shimazaki, Yuma Uchida, Kazuyuki Okitsu",
      language: "Tiếng Nhật - Phụ đề tiếng Việt",
      format: ["2D"],
      status: "coming_soon",
      trailerId: "73_1biulkYk",
      description: "Dự án đào tạo tiền đạo số 1 Nhật Bản Blue Lock bước lên màn ảnh rộng! Theo dõi hành trình bộc lộ thiên tài bóng đá tiềm ẩn của Nagi Seishiro cùng đồng đội Reo trong các trận đấu nghẹt thở.",
      showtimes: []
    },
    {
      id: "tee-yod-4",
      title: "Quỷ Ăn Tạng 4: Hổ Tinh",
      originalTitle: "Tee Yod 4: The Tiger Spirit",
      poster: "assets/images/tee-yod-4.jpg",
      banner: "assets/images/tee-yod-4.jpg",
      duration: 115,
      genre: ["Kinh dị", "Hành động", "Tâm linh"],
      releaseDate: "2026-10-16",
      rating: 9.2,
      ageRating: "T18",
      ageDescription: "Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      director: "Taweewat Wantha",
      actors: "Nadech Kugimiya, Denise Jelilcha Kapaun, Junior Kajbhunditt",
      language: "Tiếng Thái - Phụ đề tiếng Việt",
      format: ["2D", "4DX", "ScreenX", "ULTRA 4DX"],
      status: "coming_soon",
      trailerId: "_OKAwz2NiOI",
      description: "Ác mộng Tee Yod trở lại tàn khốc hơn khi linh hồn hổ tinh thức giấc giữa rừng thiêng nước độc, sẵn sàng truy đuổi và nuốt chửng linh hồn những ai dám bước chân vào lãnh địa bóng tối.",
      showtimes: []
    },
    {
      id: "shaun-the-sheep-quai-la",
      title: "Shaun The Sheep: “Quái Lạ” Ghé Nhà",
      originalTitle: "Shaun The Sheep: The Beast of Mossy Bottom",
      poster: "assets/images/shaun-the-sheep.jpg",
      banner: "assets/images/shaun-the-sheep.jpg",
      duration: 81,
      genre: ["Hoạt hình", "Hài hước", "Gia đình", "Phiêu lưu"],
      releaseDate: "2026-10-16",
      rating: 9.3,
      ageRating: "P",
      ageDescription: "Phim phổ biến tới mọi lứa tuổi khán giả",
      director: "Will Becher, Richard Phelan",
      actors: "Justin Fletcher, John Sparkes, Kate Harbour",
      language: "Âm thanh quốc tế - Phù hợp mọi gia đình",
      format: ["2D"],
      status: "coming_soon",
      trailerId: "67vbA5ZJod8",
      description: "Một sinh vật ngoài hành tinh sở hữu siêu năng lực tinh nghịch đáp xuống trang trại Mossy Bottom. Shaun và đàn cừu cùng nhau bày đủ trò tinh quái để bảo vệ người bạn mới khỏi cơ quan truy bắt bí ẩn.",
      showtimes: []
    },
    {
      id: "chuyen-cong-chua-kaguya",
      title: "Chuyện Công Chúa Kaguya",
      originalTitle: "The Tale of The Princess Kaguya (Studio Ghibli)",
      poster: "assets/images/kaguya.jpg",
      banner: "assets/images/kaguya.jpg",
      duration: 138,
      genre: ["Hoạt hình", "Kỳ ảo", "Cảm động"],
      releaseDate: "2026-10-09",
      rating: 9.6,
      ageRating: "K",
      ageDescription: "Phim dành cho người xem dưới 13 tuổi có người bảo hộ",
      director: "Isao Takahata",
      actors: "Aki Asakura, Kengo Kora, Takeo Chii",
      language: "Tiếng Nhật - Phụ đề tiếng Việt",
      format: ["2D"],
      status: "coming_soon",
      trailerId: "F7nQ088287s",
      description: "Tuyệt tác hội họa vẽ tay đề cử Oscar của cố đại sư Isao Takahata (Studio Ghibli). Cuộc đời nàng tiên sinh ra từ lóng tre, niềm hạnh phúc trần gian và nỗi buồn thăm thẳm khi phải chia xa cõi tạm.",
      showtimes: []
    },
    {
      id: "always-lalisa",
      title: "Always Lalisa",
      originalTitle: "Always Lalisa (Lisa BLACKPINK Documentary)",
      poster: "assets/images/always-lalisa.jpg",
      banner: "assets/images/always-lalisa.jpg",
      duration: 98,
      genre: ["Phim tài liệu", "Âm nhạc"],
      releaseDate: "2026-10-12",
      rating: 9.8,
      ageRating: "T13",
      ageDescription: "Phim dành cho khán giả từ đủ 13 tuổi trở lên (13+)",
      director: "Caroline Suh",
      actors: "Lalisa Manobal (LISA)",
      language: "Tiếng Anh & Thái - Phụ đề tiếng Việt",
      format: ["2D", "IMAX 2D"],
      status: "coming_soon",
      trailerId: "TcMBFSGVi1c",
      description: "Hành trình âm nhạc độc quyền ghi lại những khoảnh khắc hậu trường chưa từng công bố, các chuyến lưu diễn toàn cầu và sự thăng hoa mãnh liệt của biểu tượng âm nhạc thế giới LISA (BLACKPINK).",
      showtimes: []
    },
    {
      id: "an-mang-xem-hoan-hao",
      title: "Án Mạng Xém Hoàn Hảo",
      originalTitle: "Án Mạng Xém Hoàn Hảo",
      poster: "assets/images/an-mang-xem-hoan-hao.jpg",
      banner: "assets/images/an-mang-xem-hoan-hao.jpg",
      duration: 124,
      genre: ["Hài hước", "Trinh thám", "Hồi hộp"],
      releaseDate: "2026-10-09",
      rating: 8.9,
      ageRating: "T18",
      ageDescription: "Phim dành cho khán giả từ đủ 18 tuổi trở lên (18+)",
      director: "Victor Vũ",
      actors: "Huy Khánh, Lan Ngọc, Quang Tuấn, Hứa Vĩ Văn",
      language: "Tiếng Việt",
      format: ["2D"],
      status: "coming_soon",
      trailerId: "O4005mX-Tsk",
      description: "Một vụ án mạng kỳ lạ trong biệt thự cổ bị cô lập giữa cơn bão lớn. Các vị khách mời ai cũng có chứng cứ ngoại phạm và động cơ mờ ám, tạo nên chuỗi đấu trí căng thẳng và hài hước bậc nhất.",
      showtimes: []
    },
    {
      id: "venom-the-last-dance",
      title: "Venom: Kèo Cuối",
      originalTitle: "Venom: The Last Dance",
      poster: "assets/images/venom-3.jpg",
      banner: "assets/images/venom-3.jpg",
      duration: 110,
      genre: ["Hành động", "Khoa học viễn tưởng", "Kịch tính"],
      releaseDate: "2026-10-25",
      rating: 9.1,
      ageRating: "T13",
      ageDescription: "Phim dành cho khán giả từ đủ 13 tuổi trở lên",
      director: "Kelly Marcel",
      actors: "Tom Hardy, Chiwetel Ejiofor, Juno Temple",
      language: "Tiếng Anh - Phụ đề tiếng Việt",
      format: ["2D", "IMAX 2D", "4DX"],
      status: "coming_soon",
      trailerId: "__2bjWbetsA",
      description: "Eddie Brock và Venom đang trên đường chạy trốn. Bị săn đuổi gắt gao bởi cả quân đội loài người và đội quân quái vật vũ trụ đến từ hành tinh quê hương của loài Symbiote, bộ đôi buộc phải đưa ra một quyết định tàn khốc mang tính sinh tử.",
      showtimes: []
    },
    {
      id: "moana-2",
      title: "Hành Trình Của Moana 2",
      originalTitle: "Moana 2",
      poster: "assets/images/moana-2.jpg",
      banner: "assets/images/moana-2.jpg",
      duration: 100,
      genre: ["Hoạt hình", "Phiêu lưu", "Âm nhạc", "Hài hước"],
      releaseDate: "2026-11-29",
      rating: 9.2,
      ageRating: "P",
      ageDescription: "Mọi lứa tuổi",
      director: "David Derrick Jr.",
      actors: "Auli'i Cravalho, Dwayne Johnson, Alan Tudyk",
      language: "Tiếng Anh - Phụ đề & Lồng tiếng Việt",
      format: ["2D", "3D", "IMAX 2D"],
      status: "coming_soon",
      trailerId: "hDZ7y8RP5HE",
      description: "Ba năm sau chuyến hải trình đầu tiên, Moana nhận được một lời hiệu triệu bất ngờ từ tổ tiên. Cô cùng Á thần Maui và thủy thủ đoàn mới dấn thân vào một chuyến phiêu lưu nguy hiểm đến những vùng biển xa xôi của Châu Đại Dương.",
      showtimes: []
    }
  ],

  // 4. BẢNG GIÁ VÉ (ƯU ĐÃI SINH VIÊN UTC)
  seatPricing: {
    standard: {
      name: "Ghế Thường (Sinh viên UTC)",
      price: 65000,
      color: "#94a3b8"
    },
    vip: {
      name: "Ghế VIP (Trung tâm)",
      price: 90000,
      color: "#f59e0b"
    },
    couple: {
      name: "Ghế Đôi (Sweetbox)",
      price: 180000,
      color: "#ec4899"
    }
  },

  // 5. DANH MỤC BẮP NƯỚC & COMBO (HOT TREND TỪ CGV CINE)
  combos: [
    {
      id: "combo-solo",
      name: "Combo Sinh Viên UTC Solo",
      description: "1 Bắp rang bơ 60oz (Ngọt/Phô mai) + 1 Nước ngọt 22oz",
      price: 45000,
      badge: "Best UTC Deal",
      image: "🍿🥤"
    },
    {
      id: "combo-couple",
      name: "Combo UTC Couple 2 Người",
      description: "1 Bắp rang bơ khổng lồ 85oz + 2 Nước ngọt 22oz tuỳ chọn",
      price: 79000,
      badge: "Tiết kiệm 25%",
      image: "🍿🥤🥤"
    },
    {
      id: "combo-tomyum",
      name: "Bắp Tomyum Thái Chua Cay (Mới)",
      description: "Hương vị mới lạ: Phủ bột gia vị Tomyum cay tê, thơm nồng lá chanh sả",
      price: 55000,
      badge: "Cực Bắt Vị",
      image: "🍿🌶️"
    },
    {
      id: "combo-banhtrang",
      name: "Bánh Tráng Trộn Lắc UTC Cine",
      description: "Ăn vặt xem phim: Sa tế tôm đậm đà, Rong biển mặn ngọt hoặc Mala cay tê",
      price: 35000,
      badge: "Hot Trend",
      image: "🥢🍿"
    },
    {
      id: "combo-morning",
      name: "Morning Combo Cà Phê & Đồ Ăn Nóng",
      description: "Suất chiếu sáng: 1 Cà phê phin/sữa đá + 1 Hotfood tự chọn (Hotdog/Sausage/Mandu)",
      price: 69000,
      badge: "Good Morning UTC",
      image: "☕🌭"
    },
    {
      id: "combo-deadline",
      name: "Combo 'DEADLINE' Sinh Viên UTC",
      description: "1 Bắp khổng lồ 85oz + 2 Nước ngọt + Tặng 01 Túi Vải Canvas 'Deadline' UTC Cinema",
      price: 149000,
      badge: "Quà Tặng Độc Quyền",
      image: "🍿🥤🎒"
    }
  ],

  // 6. MÃ GIẢM GIÁ (VOUCHER ĐẶC QUYỀN UTC)
  vouchers: [
    {
      code: "UTCSTUDENT",
      description: "Đặc quyền sinh viên UTC: Đồng giá vé 45.000đ khi xuất trình thẻ SV",
      discountType: "fixed",
      value: 20000
    },
    {
      code: "HAPPYWED",
      description: "Thứ 4 Vui Vẻ: Giảm ngay 25.000đ cho mọi suất chiếu thứ Tư",
      discountType: "fixed",
      value: 25000
    },
    {
      code: "UTCCINE",
      description: "Giảm ngay 20% cho toàn bộ hoá đơn tại rạp UTC Cinema khi đặt online",
      discountType: "percent",
      value: 20
    },
    {
      code: "WELCOME",
      description: "Tân sinh viên UTC K65-K66: Giảm 15.000đ cho lần đặt đầu tiên",
      discountType: "fixed",
      value: 15000
    }
  ],

  // 7. KHUYẾN MÃI DÀNH RIÊNG CHO SINH VIÊN UTC & CGV PARTNER
  promotions: [
    {
      id: "promo-1",
      title: "Đặc Quyền Sinh Viên U22 UTC - Đồng Giá 45K",
      code: "UTCSTUDENT",
      date: "Áp dụng cả tuần cho sinh viên UTC",
      description: "Xuất trình thẻ sinh viên Trường Đại học Giao thông Vận tải khi nhận vé hoặc nhập mã UTCSTUDENT để nhận đồng giá vé 45.000đ.",
      tag: "Sinh viên U22"
    },
    {
      id: "promo-2",
      title: "Happy Wednesday - Thứ Tư Vui Vẻ Chỉ Từ 45K",
      code: "HAPPYWED",
      date: "Thứ Tư hàng tuần",
      description: "Suất chiếu phim định kỳ tại Hội trường A5 UTC với giá vé chỉ 45.000đ, miễn phí refill nước cho sinh viên các khoa.",
      tag: "Thứ 4 Vui Vẻ"
    },
    {
      id: "promo-3",
      title: "Tuần Lễ Phim Studio Ghibli Fest Tại Hội Trường A5",
      code: "GHIBLIFEST",
      date: "Đến hết 30/10/2026",
      description: "Đồng giá 50.000đ cho các kiệt tác Laputa, Kaguya, Suzume; tặng ngay Hộ chiếu Ghibli & tem chứng nhận nhà du hành điện ảnh.",
      tag: "Ghibli Fest"
    },
    {
      id: "promo-4",
      title: "Ưu Đãi Đặt Vé Online VNPAY / MoMo - Giảm 20%",
      code: "UTCCINE",
      date: "Đến hết 31/12/2026",
      description: "Nhập mã voucher UTCCINE tại bước thanh toán trên website để được chiết khấu ngay 20% tổng giá trị vé và bắp nước.",
      tag: "Voucher online"
    },
    {
      id: "promo-5",
      title: "Chào Đón Tân Sinh Viên K65 - K66 UTC",
      code: "WELCOME",
      date: "Dành cho khóa mới",
      description: "Tặng ngay voucher giảm giá 15.000đ kèm quà tặng móc khóa hoặc túi đựng laptop UTC Cinema cho tân sinh viên trường.",
      tag: "Tân sinh viên"
    }
  ]
};

// Cung cấp các tiện ích xử lý dữ liệu dùng chung
const CineVerseUtil = {
  formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  },
  
  getMovieById(id) {
    return CineVerseData.movies.find(m => m.id === id) || null;
  },
  
  getCinemaById(id) {
    return CineVerseData.cinemas.find(c => c.id === id) || null;
  },

  // Quản lý LocalStorage cho giỏ hàng, vé đã đặt và người dùng
  storage: {
    getTickets() {
      try {
        return JSON.parse(localStorage.getItem('utc_cinema_tickets') || '[]');
      } catch (e) {
        return [];
      }
    },
    saveTicket(ticket) {
      const tickets = this.getTickets();
      tickets.unshift(ticket);
      localStorage.setItem('utc_cinema_tickets', JSON.stringify(tickets));
      return tickets;
    },
    getUser() {
      try {
        return JSON.parse(localStorage.getItem('utc_cinema_user') || 'null');
      } catch (e) {
        return null;
      }
    },
    setUser(user) {
      localStorage.setItem('utc_cinema_user', JSON.stringify(user));
    },
    logout() {
      localStorage.removeItem('utc_cinema_user');
    }
  }
};
