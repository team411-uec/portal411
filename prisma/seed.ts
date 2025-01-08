import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

async function main() {
  for (let i = 0; i < prefectures.length; i++) {
    await prisma.prefecture.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        id: i + 1,
        name: prefectures[i],
      },
    });
  }

  await prisma.member.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      firstName: "四一郎",
      lastName: "電通",
      institution: "電気通信大学",
      faculty: "情報理工学域",
      department: "I類",
      major: "コンピュータサイエンスプログラム",
      studentId: "2311000",
      entrancedYear: 2023,
      email: "d2311000@gl.cc.uec.ac.jp",
      birthday: new Date("2005-01-01"),
      hasKey505: true,
      hasKeyPictlab: false,
      joinedAt: new Date("2023-04-01"),
      comment: "特になし",
      addressId: 13,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
