import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
const motorcycleEventsData: EventData[] = [
	{
		eventTitle: 'Sturgis Motorcycle Rally',
		city: 'Sturgis',
		description:
			'Join thousands of motorcycle enthusiasts in Sturgis, South Dakota for one of the largest and most famous motorcycle rallies in the world!',
		imageSrc: '/img/events/STURGIS.JPG',
	},
	{
		eventTitle: 'Daytona Bike Week',
		city: 'Daytona Beach',
		description:
			'Experience the thrill and excitement of Daytona Bike Week, a ten-day event with racing, concerts, and street festivals.',
		imageSrc: '/img/events/DAYTONA_BEACH.JPG',
	},
	{
		eventTitle: 'Isle of Man TT',
		city: 'Isle of Man',
		description:
			'Witness the world’s most dangerous and exhilarating motorcycle race on the public roads of the Isle of Man!',
		imageSrc: '/img/events/ISLE_OF_MAN.JPG',
	},
	{
		eventTitle: 'Laconia Motorcycle Week',
		city: 'Laconia',
		description:
			'Enjoy a week-long motorcycle rally filled with bike shows, races, and scenic rides in Laconia, New Hampshire.',
		imageSrc: '/img/events/LACONIA.JPG',
	},
	{
		eventTitle: 'MotoGP Grand Prix',
		city: 'Various Cities',
		description:
			'Catch the high-speed action of the MotoGP Grand Prix, featuring the world’s best riders competing on circuits around the globe.',
		imageSrc: '/img/events/MOTOGP.JPG',
	},
	{
		eventTitle: 'EICMA Motorcycle Show',
		city: 'Milan',
		description: 'Explore the latest in motorcycle innovation and design at the EICMA Motorcycle Show in Milan, Italy.',
		imageSrc: '/img/events/MILAN.JPG',
	},
	{
		eventTitle: 'Born Free Motorcycle Show',
		city: 'California',
		description:
			'Discover custom bikes and vintage motorcycles at the Born Free Motorcycle Show in Silverado, California.',
		imageSrc: '/img/events/CALIFORNIA.JPG',
	},
	{
		eventTitle: 'Red Bull Romaniacs',
		city: 'Sibiu',
		description:
			'Experience the ultimate hard enduro rally in the rugged terrain of the Carpathian Mountains in Sibiu, Romania.',
		imageSrc: '/img/events/SIBIU.JPG',
	},
];

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'event-info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>Events</span>
							<p className={'white'}>Events waiting your attention!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						<Swiper
							className={'events-product-swiper'}
							slidesPerView={'auto'}
							centeredSlides={false}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-events-next',
								prevEl: '.swiper-events-prev',
							}}
							pagination={{
								el: '.swiper-events-pagination',
							}}
						>
							{motorcycleEventsData.map((event: EventData, id: number) => {
								return (
									<SwiperSlide className={'events-product-slide'} key={id}>
										<EventCard event={event} key={event?.eventTitle} />;
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-events-prev'} />
						<div className={'swiper-events-pagination'}></div>
						<EastIcon className={'swiper-events-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
