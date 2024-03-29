import arrowImg from '../assets/img/arrow.png'
import dropImg from '../assets/img/drop.png'
import featherImg from '../assets/img/feather.png'
import purposeImg from '../assets/img/purpose.png'


export function ShoeInfo({ shoe }) {

    const shoeInfo = shoe.info

    if (Object.keys(shoe).length === 0) {
        return 'no shoe'
    }
    
    const type = shoeInfo[1][1]
    const weight = shoeInfo[1][2]
    const secUse = shoeInfo[1][3]
    const drop = shoeInfo[1][4]
    const purpose = shoeInfo[1][5]

    return (
        <section className="shoe-info">
            <section className="shoe-grid">
                <div className="type">{type}<br />
                    <span>Running Shoes</span>
                </div>
                <div className="weight">{weight} גרם
                <img className="feather-img" src={featherImg} alt="feather" />
                </div>
                <div className="sec-use">{secUse}
                <img className="arrow-img" src={arrowImg} alt="arow" />
                </div>
                <div className="drop">שיפוע עקב: {drop}
                    <img className="drop-img" src={dropImg} alt="drop" />
                </div>
                <div className="purpose">{purpose}
                <img className="purpose-img" src={purposeImg} alt="purpose" />
                </div>

            </section>

        </section >
    )

}