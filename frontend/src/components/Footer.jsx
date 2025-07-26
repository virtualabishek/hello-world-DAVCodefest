import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const socialLinks = [
        { name: 'Facebook', href: '#', icon: (props) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg> },
        { name: 'Twitter', href: '#', icon: (props) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg> },
        { name: 'Instagram', href: '#', icon: (props) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 1.043c-1.049.043-1.66.2-2.193.384a3.896 3.896 0 00-1.39 1.017A3.896 3.896 0 006.56 5.827c-.184.532-.34 1.144-.384 2.193-.044 1.023-.056 1.35-.056 3.807s.012 2.784.057 3.807c.043 1.05.2 1.66.383 2.193a3.896 3.896 0 001.017 1.39 3.896 3.896 0 001.39 1.017c.533.184 1.145.34 2.193.384 1.024.043 1.35.056 3.807.056s2.784-.013 3.807-.057c1.05-.043 1.66-.2 2.193-.383a3.896 3.896 0 001.39-1.017 3.896 3.896 0 001.017-1.39c.184-.533.34-1.145.384-2.193.043-1.024.056-1.35.056-3.807s-.012-2.784-.057-3.807c-.043-1.049-.2-1.66-.384-2.193a3.896 3.896 0 00-1.017-1.39 3.896 3.896 0 00-1.39-1.017c-.532-.184-1.144-.34-2.193-.384-1.023-.043-1.35-.056-3.807-.056zm5.787 6.166a3.54 3.54 0 11-7.08 0 3.54 3.54 0 017.08 0z" clipRule="evenodd"></path></svg> },
    ];

    return (
        <footer className="bg-slate-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/images/logo.png" alt="Logo" className="h-10 w-10 bg-white rounded-full p-1" />
                            <span className="text-xl font-bold">SaralKrishi</span>
                        </Link>
                        <p className="mt-4 text-slate-300">Your modern solution for smart and efficient farming.</p>
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map(item => (
                                <a key={item.name} href={item.href} className="text-slate-400 hover:text-green-500">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/" className="text-slate-300 hover:text-green-500">{t('navigation.home')}</Link></li>
                            <li><Link to="/community" className="text-slate-300 hover:text-green-500">{t('navigation.community')}</Link></li>
                            <li><Link to="/marketplace" className="text-slate-300 hover:text-green-500">{t('navigation.marketplace')}</Link></li>
                            <li><Link to="/news" className="text-slate-300 hover:text-green-500">News</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-slate-300 hover:text-green-500">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-300 hover:text-green-500">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} SaralKrishi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;