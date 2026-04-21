type FormSectionProps = {
    title?: string;
    description?: string;
    children: React.ReactNode;
};

const FormSection = ({ title, description, children }: FormSectionProps) => {
    return (
        <section className="form-section">
            <div className="form-section__header">
                <h2 className="form-section__title">{title}</h2>
                {description && (
                    <p className="form-section__description">{description}</p>
                )}
            </div>

            <div className="form-section__content">{children}</div>
        </section>
    );
};

export default FormSection;