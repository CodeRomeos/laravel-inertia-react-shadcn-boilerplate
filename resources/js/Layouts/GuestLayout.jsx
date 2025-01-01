import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';
import BlankLayout from './blank-layout';
import Header from './Header';
import Footer from './Footer';

export default function Guest({ children, title, metaDescription }) {
    return (
		<BlankLayout>
		 <Head title={title}>
			<meta name="description" content={metaDescription} />
		</Head>
        <Header />
		<div className="content">{children}</div>
		<Footer />
		</BlankLayout>
    );
}
