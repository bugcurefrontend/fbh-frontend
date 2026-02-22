"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated, verifyAdminAuth } from "@/services/admin-auth";

export default function AdminProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // First check client-side (quick check)
        const quickCheck = isAdminAuthenticated();

        if (!quickCheck) {
            router.push("/admin/login");
            setIsVerifying(false);
            return;
        }

        // Then verify with server (authoritative check)
        verifyAdminAuth().then((authenticated) => {
            setIsAuthenticated(authenticated);
            setIsVerifying(false);

            if (!authenticated) {
                router.push("/admin/login");
            }
        });
    }, [router]);

    // Show nothing while verifying to prevent flash of content
    if (isVerifying || !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
