import React from "react";
import { Link } from "@inertiajs/react";
import { Facebook, Instagram, Linkedin, Mail, MapPinIcon, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="px-4 divide-y bg-slate-50">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <Link href="#" className="flex justify-center space-x-3 lg:justify-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full">
                                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                            </svg>
                        </div>
                    </Link>
                        <div>
                            <span className="self-center text-2xl font-semibold">Brand name</span>
                            <p className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores excepturi delectus nam pariatur commodi libero, non impedit! Et labore ducimus perferendis placeat deserunt impedit fugiat. Reiciendis autem accusamus quam.</p>

                            <Link href="" className="text-sm underline underline-offset-4 inline-block">Learn More</Link>

                        </div>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-3">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase">Product</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Features</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Integrations</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Pricing</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase">Head Office</h3>
                        <div className="flex items-start gap-x-2">
                            <MapPinIcon className="min-w-4 h-4 mt-1" />
                            <p className="text-sm">12, B Srinivas Murthy Road, Sector 2, Delhi - 110001</p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <Phone className="min-w-4 h-4 mt-1" />
                            <p className="text-sm">+91 123456789</p>
                        </div>
                        <div className="flex items-start gap-x-2">
                            <Mail className="min-w-4 h-4 mt-1" />
                            <p className="text-sm">info@company.com</p>
                        </div>
                        <div className="flex justify-start space-x-3">
                            <Link rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                                <Linkedin />
                            </Link>
                            <Link rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                                <Facebook />
                            </Link>
                            <Link rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                                <Instagram />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 text-sm text-center">© Acme. All rights reserved.</div>
        </footer>
    );
}
