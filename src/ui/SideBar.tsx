/** @format */

const SideBar = () => {
    return (
        <aside className='row-span-2 rounded-3xl border-2 border-black bg-white p-6 shadow-md'>
            <div className='logo'>Logo</div>
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li>Cabins</li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
