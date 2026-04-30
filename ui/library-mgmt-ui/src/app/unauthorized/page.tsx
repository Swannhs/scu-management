export default function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
            <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100">
                401 - Unauthorized
            </h1>
            <p className="mt-4 text-base text-neutral-500">
                You are not authorized to access this page.
            </p>
        </div>
    );
}
