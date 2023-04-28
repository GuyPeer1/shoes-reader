
export function ShoeInfo({ shoe }) {
    if (Object.keys(shoe).length === 0) {
        return 'no shoe'
    }
    const type = shoe[1][1]
    const weight = shoe[1][2]
    const secUse = shoe[1][3]
    const drop = shoe[1][4]
    const purpose = shoe[1][5]

    return (
        <section className="shoe-info">
            <section className="shoe-grid">
                <div className="type">{type}<br/>
                    <span>Running Shoes</span>
                </div>
                <div className="weight">{weight} גרם</div>
                <div className="sec-use">{secUse}</div>
                <div className="drop">שיפוע עקב: {drop}</div>
                <div className="purpose">{purpose}</div>
            </section>

        </section >
    )

}