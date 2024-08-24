import { useDispatch, useSelector } from "react-redux"
import { STATUSES } from "../../utils/statusObj";
import DataTable from 'react-data-table-component';
import { useEffect } from "react";
import { deleteUsrById, getAllUsers } from "../../reducers/usersReducer";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const { status, users, error } = useSelector(state => state?.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateEdit = userId => {
        navigate(`/admin/editUsrForm/${userId}`)
    };
    const handleDeleteUsr = id => {
        dispatch(deleteUsrById(id));
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row?.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row?.email,
            sortable: true
        },
        {
            name: 'Phone No',
            selector: row => row?.phoneNo
        },
        {
            name: 'Address',
            selector: row => row?.address,
            sortable: true
        },
        {
            name: 'Avatar_Image',
            selector: row => <img src={row?.avatar_url} alt="..." style={{ height: '100px', width: '100px' }} />
        },
        {
            name: 'IsAdmin',
            selector: row => row?.isAdmin ? 'Admin User' : 'Regular User'
        },
        {
            name: 'IsBannedUsr',
            selector: row => row?.isBannedUsr ? 'Banned User' : 'Unbanned User'
        },
        {
            name: 'Created At',
            selector: row => row?.createdAt
        },
        {
            name: 'Actions',
            selector: row => (<div>
                <button className="btn btn-outline-success my-2" onClick={() => navigateEdit(row?._id)}>Edit</button>
                <button className="btn btn-outline-danger my-2" onClick={() => handleDeleteUsr(row?._id)}>Delete</button>
            </div>),
            wrap: true
        }
    ];
    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px', // increase font size
                fontWeight: 'bold', // make it bold
            },
        },
        cells: {
            style: {
                textAlign: 'center'
            }
        }
    };
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    if (status === STATUSES.ERROR) {
        return (<div className="container vh-100 justify-content-center align-items-center">
            <h1 className="text-danger my-3">{error}</h1>
        </div>);
    }
    return (
        <div>
            <h1>Users page</h1>
            <DataTable
                data={users}
                columns={columns}
                responsive
                striped
                pagination
                customStyles={customStyles}
                noDataComponent={status === STATUSES.LOADING ? (
                    <div className="spinner-container">
                        <Vortex
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="vortex-loading"
                            wrapperStyle={{}}
                            wrapperClass="vortex-wrapper"
                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    </div>
                ) : 'No records to display'}
            />
        </div>
    )
}

export default Users