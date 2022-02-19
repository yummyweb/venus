import styles from "../styles/SingleTicket.module.css"
import Qrcode from "../images/qrcode.png"
import Image from "next/image"
import QRCode from "react-qr-code"

interface IProps {
    details: any,
    id: string
}

export const SingleTicket = ({ details, id }): React.FC<IProps> => {
    console.log(details)
    return (
<div id={id}>
        <div class={styles.ticket}>
	<div class={styles.left}>
		<div style={{ backgroundImage: `url(${details.image}?filename=image.png)` }} class={styles.image}>
			<p class={styles["admit-one"]}>
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
				<span>ADMIT ONE</span>
			</p>
			<div class={styles["ticket-number"]}>
				<p>
					#20030220
				</p>
			</div>
		</div>
		<div class={styles["ticket-info"]}>
			<p class={styles.date}>
				<span>TUESDAY</span>
				<span class={styles.june29}>JUNE 29TH</span>
				<span>2021</span>
			</p>
			<div class={styles["show-name"]}>
				<h1>{ details.eventName }</h1>
				<h2>{ details.creator }</h2>
			</div>
			<div class={styles.time}>
				<p>8:00 PM <span>TO</span> 11:00 PM</p>
				<p>DOORS <span>@</span> 7:00 PM</p>
			</div>
			<p class={styles.location}><span>East High School</span>
				<span class={styles.separator}><i class={`${styles.far} ${styles["fa-smile"]}`}></i></span><span>{ details.location }</span>
			</p>
		</div>
	</div>
	<div class={styles.right}>
		<p class={`${styles["admit-one"]}`}>
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
			<span>ADMIT ONE</span>
		</p>
		<div class={styles["right-info-container"]}>
			<div class={styles["show-name"]}>
				<h1>{ details.eventName }</h1>
			</div>
			<div class={styles.time}>
				<p>8:00 PM <span>TO</span> 11:00 PM</p>
				<p>DOORS <span>@</span> 7:00 PM</p>
			</div>
			<div class={styles.barcode}>
                <QRCode size={100} value={details.id.toString()} />
			</div>
			<p class={styles["ticket-number"]}>
				#{details.id.toString()}
			</p>
		</div>
	</div>
    </div>
</div>
    )
}
