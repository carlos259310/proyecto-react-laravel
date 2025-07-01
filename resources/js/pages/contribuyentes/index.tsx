import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contribuyentes',
        href: '/contribuyentes',
    },
];
// Datos de ejemplo
const contribuyentes = [
    { id: 1, nombre: 'Juan Pérez', documento: '12345678', telefono: '3001234567' },
    { id: 2, nombre: 'Ana Gómez', documento: '87654321', telefono: '3109876543' },
];

export default function Contribuyentes() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contribuyentes" />
        <div className="container mt-4">
                <h2>Contribuyentes</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Documento</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contribuyentes.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.documento}</td>
                                    <td>{c.telefono}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2">Editar</button>
                                        <button className="btn btn-sm btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
