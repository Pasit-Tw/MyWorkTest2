export const state = () => ({

    cart: [],
    counter: 0,
    allproduct: [{
            id: '01',
            name: 'StanDard Room',
            price: 750,
            detail: 'เพื่อความสะดวกสบายที่คุ้มค่า  เป็นห้องพักที่เหมาะแก่การพักผ่อนของคุณ ห้องพักตกแต่งในสไตล์ไทยร่วมสมัยด้วยโทนสีอบอุ่นและแสงธรรมชาติ  เพิ่มความสะดวกสบายด้วย โทรทัศน์ LCD ขนาด 32 นิ้ว และฟรี WiFi อินเทอร์เน็ตภายในห้องพัก',
            image: 'http://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg',

        },{
        id: '02',
        name: 'Deluxe Room',
        price: 1200,
        detail: 'ห้องแกรนด์ ดีลักซ์ (Grand Deluxe) ของโรงแรมอมารี ดอนเมือง แอร์พอร์ต กรุงเทพฯ เป็นตัวเลือกที่สมบูรณ์แบบ ไม่ว่าคุณจะเดินทางเพื่อมาเที่ยว หรือมาทำธุรกิจ เรามีโต๊ะทำงาน และฟรี อินเทอร์เน็ต WiFi และระเบียบส่วนตัว เพื่อให้คุณผ่อนคลายได้เต็มที่',
        image: 'https://s7d2.scene7.com/is/image/ritzcarlton/RCDUBAI_00128_conversion?$XlargeViewport100pct$',
    },{
        id: '03',
        name: 'Superrior Room',
        price: 1600,
        detail: 'ห้องพักแบบซูพีเรีย (Superior) ตกแต่งอย่างทันสมัย ห้องพักมี ฟรี WiFi อินเทอร์เน็ต, โทรทัศน์ LCD 32 นิ้ว, เครื่องเล่น DVD, โต๊ะทำงาน และ อุปกรณ์ชงชาและกาแฟ ห้องอาบน้ำมีฝักบัว rain shower และไดร์เป่าผม',
        image: 'https://www.pprincess.com/wp-content/uploads/2017/02/Superior-Room_02.jpg',
    }
        
    ],

})
export const mutations = {

    addcart(state, product) {
        state.counter++
            state.cart.push(product)
    },
    removecart(state, index) {
        state.counter--
            state.cart.splice(index, 1)
    },
}